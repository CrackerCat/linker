﻿using linker.client.config;
using linker.config;
using linker.plugins.tuntap.messenger;
using linker.plugins.tuntap.proxy;
using linker.libs;
using MemoryPack;
using System.Buffers.Binary;
using System.Collections.Concurrent;
using System.Net;
using System.Net.NetworkInformation;
using linker.plugins.client;
using linker.plugins.messenger;
using linker.plugins.tuntap.config;
using linker.tun;

namespace linker.plugins.tuntap
{
    public sealed class TuntapTransfer
    {
        private readonly MessengerSender messengerSender;
        private readonly ClientSignInState clientSignInState;
        private readonly FileConfig config;
        private readonly TuntapProxy tuntapProxy;
        private readonly RunningConfig runningConfig;
        private readonly LinkerTunDeviceAdapter linkerTunDeviceAdapter;

        private string interfaceName = "linker";

        private uint infosVersion = 0;
        public uint InfosVersion => infosVersion;

        private readonly ConcurrentDictionary<string, TuntapInfo> tuntapInfos = new ConcurrentDictionary<string, TuntapInfo>();
        public ConcurrentDictionary<string, TuntapInfo> Infos => tuntapInfos;

        public TuntapStatus Status => (TuntapStatus)(byte)linkerTunDeviceAdapter.Status;

        public TuntapTransfer(MessengerSender messengerSender, ClientSignInState clientSignInState, LinkerTunDeviceAdapter linkerTunDeviceAdapter, FileConfig config, TuntapProxy tuntapProxy, RunningConfig runningConfig)
        {
            this.messengerSender = messengerSender;
            this.clientSignInState = clientSignInState;
            this.linkerTunDeviceAdapter = linkerTunDeviceAdapter;
            this.config = config;
            this.tuntapProxy = tuntapProxy;
            this.runningConfig = runningConfig;

            GetRouteIps();
            clientSignInState.NetworkEnabledHandle += (times) =>
            {
                OnChange();
            };
            clientSignInState.NetworkFirstEnabledHandle += () =>
            {
                OnChange();
                if (runningConfig.Data.Tuntap.Running)
                {
                    Stop(); Run();
                    _ = CheckVeaStatusTask();
                }
            };

            linkerTunDeviceAdapter.SetReadCallback(tuntapProxy);
            linkerTunDeviceAdapter.Shutdown();
            AppDomain.CurrentDomain.ProcessExit += (s, e) => Shutdown();
            Console.CancelKeyPress += (s, e) => Shutdown();
        }

        /// <summary>
        /// 程序关闭
        /// </summary>
        private void Shutdown()
        {
            bool running = runningConfig.Data.Tuntap.Running;
            Stop();
            runningConfig.Data.Tuntap.Running = running;
            runningConfig.Data.Update();
        }

        /// <summary>
        /// 运行网卡
        /// </summary>
        public void Run()
        {
            Task.Run(() =>
            {
                OnChange();
                try
                {
                    if (runningConfig.Data.Tuntap.IP.Equals(IPAddress.Any))
                    {
                        return;
                    }

                    linkerTunDeviceAdapter.SetUp(interfaceName, runningConfig.Data.Tuntap.InterfaceGuid, runningConfig.Data.Tuntap.IP, 24);
                    linkerTunDeviceAdapter.SetMtu(1416);
                    linkerTunDeviceAdapter.SetNat();
                    runningConfig.Data.Tuntap.Running = Status == TuntapStatus.Running;
                    runningConfig.Data.Update();

                    if (string.IsNullOrWhiteSpace(linkerTunDeviceAdapter.Error) == false)
                    {
                        LoggerHelper.Instance.Error(linkerTunDeviceAdapter.Error);
                    }
                }
                catch (Exception ex)
                {
                    LoggerHelper.Instance.Error(ex);
                }
                finally
                {
                    OnChange();
                }
            });
        }
        /// <summary>
        /// 停止网卡
        /// </summary>
        public void Stop()
        {
            try
            {
                OnChange();
                linkerTunDeviceAdapter.Shutdown();
                runningConfig.Data.Tuntap.Running = Status == TuntapStatus.Running;
                runningConfig.Data.Update();
            }
            catch (Exception ex)
            {
                if (LoggerHelper.Instance.LoggerLevel <= LoggerTypes.DEBUG)
                {
                    LoggerHelper.Instance.Error(ex);
                }
            }
            finally
            {
                OnChange();
            }
        }

        /// <summary>
        /// 刷新信息，把自己的网卡配置发给别人，顺便把别人的网卡信息带回来
        /// </summary>
        public void Refresh()
        {
            OnChange();
        }

        /// <summary>
        /// 更新本机网卡信息
        /// </summary>
        /// <param name="info"></param>
        public void OnUpdate(TuntapInfo info)
        {
            Task.Run(() =>
            {
                runningConfig.Data.Tuntap.IP = info.IP;
                runningConfig.Data.Tuntap.LanIPs = info.LanIPs;
                runningConfig.Data.Tuntap.Masks = info.Masks;
                runningConfig.Data.Tuntap.BufferSize = info.BufferSize;
                runningConfig.Data.Update();
                if (Status == TuntapStatus.Running)
                {
                    Stop();
                    Run();
                }
                else
                {
                    OnChange();
                }
            });
        }
        /// <summary>
        /// 收到别的客户端的网卡信息
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public TuntapInfo OnConfig(TuntapInfo info)
        {
            Task.Run(() =>
            {
                DelRoute();
                tuntapInfos.AddOrUpdate(info.MachineId, info, (a, b) => info);
                Interlocked.Increment(ref infosVersion);
                AddRoute();
            });

            return GetLocalInfo();
        }

        /// <summary>
        /// 信息有变化，刷新信息，把自己的网卡配置发给别人，顺便把别人的网卡信息带回来
        /// </summary>
        private void OnChange()
        {
            GetRemoteInfo().ContinueWith((result) =>
            {
                if (result.Result == null)
                {
                    OnChange();
                }
                else
                {
                    DelRoute();
                    foreach (var item in result.Result)
                    {
                        tuntapInfos.AddOrUpdate(item.MachineId, item, (a, b) => item);
                    }
                    Interlocked.Increment(ref infosVersion);
                    AddRoute();
                }
            });
        }
        /// <summary>
        /// 获取自己的网卡信息
        /// </summary>
        /// <returns></returns>
        private TuntapInfo GetLocalInfo()
        {
            TuntapInfo info = new TuntapInfo
            {
                IP = runningConfig.Data.Tuntap.IP,
                LanIPs = runningConfig.Data.Tuntap.LanIPs,
                Masks = runningConfig.Data.Tuntap.Masks,
                MachineId = config.Data.Client.Id,
                Status = Status,
                Error = linkerTunDeviceAdapter.Error,
                BufferSize = runningConfig.Data.Tuntap.BufferSize,
                HostIP = IPAddress.Any
            };
            if (runningConfig.Data.Tuntap.Masks.Length != runningConfig.Data.Tuntap.LanIPs.Length)
            {
                runningConfig.Data.Tuntap.Masks = runningConfig.Data.Tuntap.LanIPs.Select(c => 24).ToArray();
            }

            return info;
        }
        /// <summary>
        /// 获取别人的网卡信息
        /// </summary>
        /// <returns></returns>
        private async Task<List<TuntapInfo>> GetRemoteInfo()
        {
            TuntapInfo info = GetLocalInfo();
            MessageResponeInfo resp = await messengerSender.SendReply(new MessageRequestWrap
            {
                Connection = clientSignInState.Connection,
                MessengerId = (ushort)TuntapMessengerIds.ConfigForward,
                Payload = MemoryPackSerializer.Serialize(info),
                Timeout = 3000
            }).ConfigureAwait(false);
            if (resp.Code != MessageResponeCodes.OK)
            {
                return null;
            }

            List<TuntapInfo> infos = MemoryPackSerializer.Deserialize<List<TuntapInfo>>(resp.Data.Span);
            infos.Add(info);
            return infos;
        }

        /// <summary>
        /// 删除路由
        /// </summary>
        private void DelRoute()
        {
            List<TuntapVeaLanIPAddressList> ipsList = ParseIPs(tuntapInfos.Values.ToList());
            TuntapVeaLanIPAddress[] ips = ipsList.SelectMany(c => c.IPS).ToArray();
            linkerTunDeviceAdapter.DelRoute(ipsList.SelectMany(c => c.IPS).Select(c => new LinkerTunDeviceRouteItem { Address = c.OriginIPAddress, Mask = c.MaskLength }).ToArray());
        }
        /// <summary>
        /// 添加路由
        /// </summary>
        private void AddRoute()
        {
            List<TuntapVeaLanIPAddressList> ipsList = ParseIPs(tuntapInfos.Values.ToList());
            TuntapVeaLanIPAddress[] ips = ipsList.SelectMany(c => c.IPS).ToArray();
            linkerTunDeviceAdapter.AddRoute(ipsList.SelectMany(c => c.IPS).Select(c => new LinkerTunDeviceRouteItem { Address = c.OriginIPAddress, Mask = c.MaskLength }).ToArray(), runningConfig.Data.Tuntap.IP);

            tuntapProxy.SetIPs(ipsList);
            foreach (var item in tuntapInfos.Values)
            {
                tuntapProxy.SetIP(item.MachineId, BinaryPrimitives.ReadUInt32BigEndian(item.IP.GetAddressBytes()));
            }
        }

        private List<TuntapVeaLanIPAddressList> ParseIPs(List<TuntapInfo> infos)
        {
            uint[] localIps = NetworkHelper.GetIPV4()
                .Concat(new IPAddress[] { runningConfig.Data.Tuntap.IP })
                .Concat(runningConfig.Data.Tuntap.LanIPs)
                .Concat(routeIps)
                .Select(c => BinaryPrimitives.ReadUInt32BigEndian(c.GetAddressBytes()))
                .ToArray();

            return infos
                //自己的ip不要
                .Where(c => c.IP.Equals(runningConfig.Data.Tuntap.IP) == false)
                .Select(c =>
                {
                    return new TuntapVeaLanIPAddressList
                    {
                        MachineId = c.MachineId,
                        IPS = ParseIPs(c.LanIPs, c.Masks)
                        //这边的局域网IP也不要，为了防止将本机局域网IP路由到别的地方
                        .Where(c => localIps.Select(d => d & c.MaskValue).Contains(c.NetWork) == false).ToList(),
                    };
                }).ToList();
        }
        private List<TuntapVeaLanIPAddress> ParseIPs(IPAddress[] lanIPs, int[] masks)
        {
            if (masks.Length != lanIPs.Length) masks = lanIPs.Select(c => 24).ToArray();
            return lanIPs.Where(c => c.Equals(IPAddress.Any) == false).Select((c, index) =>
            {
                return ParseIPAddress(c, (byte)masks[index]);

            }).ToList();
        }
        private TuntapVeaLanIPAddress ParseIPAddress(IPAddress ip, byte maskLength = 24)
        {
            uint ipInt = BinaryPrimitives.ReadUInt32BigEndian(ip.GetAddressBytes());
            //掩码十进制
            uint maskValue = NetworkHelper.MaskValue(maskLength);
            return new TuntapVeaLanIPAddress
            {
                IPAddress = ipInt,
                MaskLength = maskLength,
                MaskValue = maskValue,
                NetWork = ipInt & maskValue,
                Broadcast = ipInt | (~maskValue),
                OriginIPAddress = ip,
            };
        }


        List<IPAddress> routeIps = new List<IPAddress>();
        private void GetRouteIps()
        {
            NetworkHelper.GetRouteLevel(out routeIps);
        }

        private async Task CheckVeaStatusTask()
        {
            while (true)
            {
                try
                {
                    if (runningConfig.Data.Tuntap.Running)
                    {
                        await Task.Delay(5000).ConfigureAwait(false);
                        await CheckInterface().ConfigureAwait(false);
                    }
                }
                catch (Exception)
                {
                }

                await Task.Delay(15000).ConfigureAwait(false);
            }
        }
        private async Task CheckInterface()
        {
            NetworkInterface networkInterface = NetworkInterface.GetAllNetworkInterfaces().FirstOrDefault(c => c.Name == interfaceName);

            if (networkInterface == null || networkInterface.OperationalStatus != OperationalStatus.Up)
            {
                LoggerHelper.Instance.Error($"tuntap inerface {interfaceName} is {networkInterface?.OperationalStatus ?? OperationalStatus.Unknown}, restarting");
                Stop();
                await Task.Delay(5000).ConfigureAwait(false);
                Run();
            }
        }
    }
}
