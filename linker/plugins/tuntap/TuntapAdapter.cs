﻿using linker.libs;
using linker.plugins.client;
using linker.plugins.tunnel;
using linker.plugins.tuntap.config;
using linker.tun;
using System.Net;

namespace linker.plugins.tuntap
{
    public sealed class TuntapAdapter : ILinkerTunDeviceCallback
    {
        private List<LinkerTunDeviceForwardItem> forwardItems = new List<LinkerTunDeviceForwardItem>();
        private LinkerTunDeviceRouteItem[] routeItems = new LinkerTunDeviceRouteItem[0];

        private readonly TuntapTransfer tuntapTransfer;
        private readonly TuntapConfigTransfer tuntapConfigTransfer;
        private readonly TuntapDecenter tuntapDecenter;
        private readonly TuntapProxy tuntapProxy;
        private readonly ClientSignInState clientSignInState;
        private readonly TunnelConfigTransfer tunnelConfigTransfer;
        private readonly ClientConfigTransfer clientConfigTransfer;

        public TuntapAdapter(TuntapTransfer tuntapTransfer, TuntapConfigTransfer tuntapConfigTransfer, TuntapDecenter tuntapDecenter, TuntapProxy tuntapProxy,
            ClientSignInState clientSignInState, TunnelConfigTransfer tunnelConfigTransfer, ClientConfigTransfer clientConfigTransfer)
        {
            this.tuntapTransfer = tuntapTransfer;
            this.tuntapConfigTransfer = tuntapConfigTransfer;
            this.tuntapDecenter = tuntapDecenter;
            this.tuntapProxy = tuntapProxy;
            this.clientSignInState = clientSignInState;
            this.tunnelConfigTransfer = tunnelConfigTransfer;
            this.clientConfigTransfer = clientConfigTransfer;

            //初始化网卡
            tuntapTransfer.Init(tuntapConfigTransfer.DeviceName, this);
            //与服务器连接，刷新一下IP
            clientSignInState.NetworkEnabledHandle += (times) => tuntapConfigTransfer.RefreshIP();
            //配置又更新，去同步一下
            tuntapConfigTransfer.OnUpdate += tuntapDecenter.Refresh;
            //配置发生变化，重启网卡
            tuntapConfigTransfer.OnChanged += RetstartDevice;

            //收到新的信息，添加一下路由
            tuntapDecenter.OnChangeBefore += DelRoute;
            tuntapDecenter.OnChangeAfter += AddRoute;
            tuntapDecenter.OnReset += tuntapProxy.ClearIPs;
            tuntapDecenter.HandleCurrentInfo = GetCurrentInfo;

            //网卡状态发生变化，同步一下信息
            tuntapTransfer.OnSetupBefore += tuntapDecenter.Refresh;
            tuntapTransfer.OnSetupAfter += tuntapDecenter.Refresh;
            tuntapTransfer.OnSetupSuccess += () => { tuntapDecenter.Refresh(); AddForward(); tuntapConfigTransfer.SetRunning(true); };
            tuntapTransfer.OnShutdownBefore += tuntapDecenter.Refresh;
            tuntapTransfer.OnShutdownAfter += tuntapDecenter.Refresh;
            tuntapTransfer.OnShutdownSuccess += () => { tuntapDecenter.Refresh(); DeleteForward(); tuntapConfigTransfer.SetRunning(false); };

            //隧道关闭
            tuntapProxy.OnTunnelClose += async (connection) => { tuntapDecenter.Refresh(); await Task.CompletedTask; };
            //收到隧道数据包，写入网卡
            tuntapProxy.OnReceivePacket += async (connection, buffer) => { tuntapTransfer.Write(buffer); await Task.CompletedTask; };
            //IP没找到，是否需要同步一下数据
            tuntapProxy.OnIPNotFound += (ip) => tuntapDecenter.Refresh();

        }
        private TuntapInfo GetCurrentInfo()
        {
            return new TuntapInfo
            {
                IP = tuntapConfigTransfer.Info.IP,
                Lans = tuntapConfigTransfer.Info.Lans.Where(c => c.IP != null && c.IP.Equals(IPAddress.Any) == false).Select(c => { c.Exists = false; return c; }).ToList(),
                PrefixLength = tuntapConfigTransfer.Info.PrefixLength,
                MachineId = clientConfigTransfer.Id,
                Status = tuntapTransfer.Status,
                SetupError = tuntapTransfer.SetupError,
                NatError = tuntapTransfer.NatError,
                SystemInfo = $"{System.Runtime.InteropServices.RuntimeInformation.OSDescription} {(string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("SNLTTY_LINKER_IS_DOCKER")) == false ? "Docker" : "")}",

                Forwards = tuntapConfigTransfer.Info.Forwards,
                Switch = tuntapConfigTransfer.Info.Switch
            };
        }

        public async Task Callback(LinkerTunDevicPacket packet)
        {
            if (packet.IPV4Broadcast || packet.IPV6Multicast)
            {
                if ((tuntapConfigTransfer.Switch & TuntapSwitch.Multicast) == TuntapSwitch.Multicast)
                {
                    return;
                }
            }
            await tuntapProxy.InputPacket(packet);
        }

        /// <summary>
        /// 重启网卡
        /// </summary>
        /// <returns></returns>
        public async Task RetstartDevice()
        {
            tuntapTransfer.Shutdown();
            await tuntapConfigTransfer.RefreshIPASync();
            tuntapTransfer.Setup(tuntapConfigTransfer.Info.IP, tuntapConfigTransfer.Info.PrefixLength);
        }
        /// <summary>
        /// 关闭网卡
        /// </summary>
        public void StopDevice()
        {
            tuntapTransfer.Shutdown();
        }

        // <summary>
        /// 添加端口转发
        /// </summary>
        private void AddForward()
        {
            var temp = ParseForwardItems();
            var removes = forwardItems.Except(temp, new LinkerTunDeviceForwardItemComparer());
            if (removes.Any())
            {
                tuntapTransfer.RemoveForward(removes.ToList());
            }
            forwardItems = temp;
            tuntapTransfer.AddForward(forwardItems);
        }
        /// <summary>
        /// 删除端口转发
        /// </summary>
        public void DeleteForward()
        {
            tuntapTransfer.RemoveForward(forwardItems);
        }
        private List<LinkerTunDeviceForwardItem> ParseForwardItems()
        {
            return tuntapConfigTransfer.Info.Forwards.Select(c => new LinkerTunDeviceForwardItem { ListenAddr = c.ListenAddr, ListenPort = c.ListenPort, ConnectAddr = c.ConnectAddr, ConnectPort = c.ConnectPort }).ToList();
        }

        /// <summary>
        /// 删除路由
        /// </summary>
        private void DelRoute()
        {
            if (routeItems != null)
                tuntapTransfer.DelRoute(routeItems);
        }
        /// <summary>
        /// 添加路由
        /// </summary>
        private void AddRoute()
        {
            List<TuntapVeaLanIPAddressList> ipsList = ParseIPs(tuntapDecenter.Infos.Values.ToList());
            TuntapVeaLanIPAddress[] ips = ipsList.SelectMany(c => c.IPS).ToArray();
            routeItems = ipsList.SelectMany(c => c.IPS).Select(c => new LinkerTunDeviceRouteItem { Address = c.OriginIPAddress, PrefixLength = c.PrefixLength }).ToArray();

            tuntapTransfer.AddRoute(routeItems, tuntapConfigTransfer.Info.IP);

            tuntapProxy.SetIPs(ips);
            foreach (var item in tuntapDecenter.Infos.Values)
            {
                tuntapProxy.SetIP(item.MachineId, NetworkHelper.IP2Value(item.IP));
            }
            foreach (var item in tuntapDecenter.Infos.Values.Where(c => c.IP.Equals(IPAddress.Any)))
            {
                tuntapProxy.RemoveIP(item.MachineId);
            }
        }

        private List<TuntapVeaLanIPAddressList> ParseIPs(List<TuntapInfo> infos)
        {
            //排除的IP，
            uint[] excludeIps =//本机局域网IP
                tunnelConfigTransfer.LocalIPs.Where(c => c.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                //路由上的IP
                .Concat(tunnelConfigTransfer.RouteIPs)
                //网卡IP  服务器IP
                .Concat(new IPAddress[] { tuntapConfigTransfer.Info.IP, clientSignInState.Connection.Address.Address })
                //网卡配置的局域网IP
                .Concat(tuntapConfigTransfer.Info.Lans.Select(c => c.IP))
                .Select(NetworkHelper.IP2Value)
                .ToArray();

            HashSet<uint> hashSet = new HashSet<uint>();

            return infos
                .Where(c => c.MachineId != clientConfigTransfer.Id)
                .OrderByDescending(c => c.Status)
                .OrderByDescending(c => c.LastTicks.Value)

                .Select(c =>
                {
                    var lans = c.Lans.Where(c => c.Disabled == false && c.IP.Equals(IPAddress.Any) == false).Where(c =>
                    {
                        uint ipInt = NetworkHelper.IP2Value(c.IP);
                        uint maskValue = NetworkHelper.PrefixLength2Value(c.PrefixLength);
                        uint network = ipInt & maskValue;
                        c.Exists = excludeIps.Any(d => (d & maskValue) == network) || hashSet.Contains(network);
                        hashSet.Add(network);
                        return c.Exists == false;
                    });

                    return new TuntapVeaLanIPAddressList
                    {
                        MachineId = c.MachineId,
                        IPS = ParseIPs(lans.ToList(), c.MachineId)
                        .Where(c => excludeIps.Select(d => d & c.MaskValue).Contains(c.NetWork) == false).ToList(),
                    };
                }).ToList();
        }
        private List<TuntapVeaLanIPAddress> ParseIPs(List<TuntapLanInfo> lans, string machineid)
        {
            return lans.Where(c => c.IP.Equals(IPAddress.Any) == false && c != null).Select((c, index) =>
            {
                return ParseIPAddress(c.IP, c.PrefixLength, machineid);

            }).ToList();
        }
        private TuntapVeaLanIPAddress ParseIPAddress(IPAddress ip, byte prefixLength, string machineid)
        {
            uint ipInt = NetworkHelper.IP2Value(ip);
            //掩码十进制
            uint maskValue = NetworkHelper.PrefixLength2Value(prefixLength);
            return new TuntapVeaLanIPAddress
            {
                IPAddress = ipInt,
                PrefixLength = prefixLength,
                MaskValue = maskValue,
                NetWork = ipInt & maskValue,
                Broadcast = ipInt | ~maskValue,
                OriginIPAddress = ip,
                MachineId = machineid
            };
        }


    }
}
