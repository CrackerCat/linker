﻿using linker.libs;
using linker.libs.extends;
using Microsoft.Win32;
using System.Buffers.Binary;
using System.Net;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;

namespace linker.tun
{
    [SupportedOSPlatform("windows")]
    internal sealed class LinkerWinTunDevice : ILinkerTunDevice
    {
        private string name = string.Empty;
        public string Name => name;
        public bool Running => session != 0;

        private IntPtr waitHandle = IntPtr.Zero, adapter = IntPtr.Zero, session = IntPtr.Zero;
        private Guid guid;
        private int interfaceNumber = 0;
        private IPAddress address;
        private byte prefixLength = 24;

        private CancellationTokenSource tokenSource;

        public LinkerWinTunDevice(string name, Guid guid)
        {
            this.name = name;
            this.guid = guid;
        }

        public bool Setup(IPAddress address, IPAddress gateway, byte prefixLength, out string error)
        {
            this.address = address;
            this.prefixLength = prefixLength;

            error = string.Empty;
            if (adapter != 0)
            {
                error = ($"Adapter already exists");
                return false;
            }

            adapter = WinTun.WintunCreateAdapter(name, name, ref guid);
            if (adapter == 0)
            {
                error = ($"Failed to create adapter {Marshal.GetLastWin32Error()}");
                Shutdown();
                return false;
            }
            uint version = WinTun.WintunGetRunningDriverVersion();
            session = WinTun.WintunStartSession(adapter, 0x400000);
            if (session == 0)
            {
                error = ($"Failed to start session");
                Shutdown();
                return false;
            }

            waitHandle = WinTun.WintunGetReadWaitEvent(session);

            for (int i = 0; i < 5; i++)
            {
                try
                {
                    AddIPV4();
                    AddIPV6();

                    GetWindowsInterfaceNum();
                    tokenSource = new CancellationTokenSource();
                    return true;
                }
                catch (Exception)
                {
                    Thread.Sleep(1000);
                }
            }

            error = ($"Failed to set adapter ip {Marshal.GetLastWin32Error()}");
            Shutdown();
            return false;

        }

        private void AddIPV4()
        {
            WinTun.WintunGetAdapterLUID(adapter, out ulong luid);
            {
                WinTun.MIB_UNICASTIPADDRESS_ROW AddressRow = default;
                WinTun.InitializeUnicastIpAddressEntry(ref AddressRow);
                AddressRow.sin_family = 2;
                AddressRow.sin_addr = BinaryPrimitives.ReadUInt32LittleEndian(address.GetAddressBytes());
                AddressRow.OnLinkPrefixLength = prefixLength;
                AddressRow.DadState = 4;
                AddressRow.InterfaceLuid = luid;
                uint LastError = WinTun.CreateUnicastIpAddressEntry(ref AddressRow);
                if (LastError != 0) throw new InvalidOperationException();
            }
        }
        private void AddIPV6()
        {
            NetworkInterface networkInterface = NetworkInterface.GetAllNetworkInterfaces().FirstOrDefault(c => c.Name == Name);
            if (networkInterface != null)
            {
                var commands = networkInterface.GetIPProperties()
                    .UnicastAddresses
                    .Where(c => c.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
                    .Select(c => new IPAddress(c.Address.GetAddressBytes(), 0))
                    .Select(c => $"netsh interface ipv6 delete address \"{Name}\" address=\"{c}\"").ToList();

                byte[] ipv6 = IPAddress.Parse("fe80::1818:1818:1818:1818").GetAddressBytes();
                address.GetAddressBytes().CopyTo(ipv6, ipv6.Length - 4);
                commands.Add($"netsh interface ipv6 add address \"{Name}\" address=\"{new IPAddress(ipv6)}\"");
                CommandHelper.Windows(string.Empty, [.. commands]);
            }
        }


        public void Shutdown()
        {
            tokenSource?.Cancel();
            if (waitHandle != 0)
            {
                WinTun.SetEvent(waitHandle);
            }
            if (session != 0)
            {
                WinTun.WintunEndSession(session);
            }
            if (adapter != 0)
            {
                WinTun.WintunCloseAdapter(adapter);
            }
            waitHandle = 0;
            session = 0;
            adapter = 0;
            interfaceNumber = 0;
        }


        public void SetMtu(int value)
        {
            CommandHelper.Windows(string.Empty, new string[] {
                $"netsh interface ipv4 set subinterface {interfaceNumber}  mtu={value} store=persistent" ,
                 $"netsh interface ipv6 set subinterface {interfaceNumber}  mtu={value} store=persistent"
            });
        }
        public void SetNat(out string error)
        {
            error = string.Empty;
            try
            {
                CommandHelper.PowerShell($"start-service WinNat", [], out error);
                IPAddress network = NetworkHelper.ToNetworkIp(this.address, NetworkHelper.GetPrefixIP(prefixLength));
                CommandHelper.PowerShell($"New-NetNat -Name {Name} -InternalIPInterfaceAddressPrefix {network}/{prefixLength}", [], out error);

                if (string.IsNullOrWhiteSpace(error) == false)
                {
                    error = "NetNat Not Supported";
                    string result = CommandHelper.Windows(string.Empty, ["netsh routing"]);
                    if (result.Contains("netsh routing ip"))
                    {
                        error = string.Empty;
                    }
                    else
                    {
                        error += "，RRAS Not Supported";
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
        }
        public void RemoveNat(out string error)
        {
            error = string.Empty;

            try
            {
                CommandHelper.PowerShell($"start-service WinNat", [], out error);
                CommandHelper.PowerShell($"Remove-NetNat -Name {Name} -Confirm:$false", [], out error);
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
        }


        public void AddForward(List<LinkerTunDeviceForwardItem> forwards)
        {
            string[] commands = forwards.Where(c => c != null && c.Enable).Select(c =>
            {
                return $"netsh interface portproxy add v4tov4 listenaddress={c.ListenAddr} listenport={c.ListenPort} connectaddress={c.ConnectAddr} connectport={c.ConnectPort}";
            }).ToArray();
            CommandHelper.Windows(string.Empty, commands);
        }
        public void RemoveForward(List<LinkerTunDeviceForwardItem> forwards)
        {
            string[] commands = forwards.Where(c => c != null && c.Enable).Select(c =>
            {
                return $"netsh interface portproxy delete v4tov4 listenport={c.ListenPort} listenaddress={c.ListenAddr}";
            }).ToArray();
            CommandHelper.Windows(string.Empty, commands);
        }


        public void AddRoute(LinkerTunDeviceRouteItem[] ips, IPAddress ip)
        {
            if (interfaceNumber > 0)
            {
                string[] commands = ips.Select(item =>
                {
                    uint maskValue = NetworkHelper.GetPrefixIP(item.PrefixLength);
                    IPAddress mask = NetworkHelper.GetPrefixIp(maskValue);
                    IPAddress _ip = NetworkHelper.ToNetworkIp(item.Address, maskValue);

                    return $"route add {_ip} mask {mask} {ip} metric 5 if {interfaceNumber}";
                }).ToArray();
                if (commands.Length > 0)
                {
                    CommandHelper.Windows(string.Empty, commands);
                }
            }
        }
        public void DelRoute(LinkerTunDeviceRouteItem[] ip)
        {
            string[] commands = ip.Select(item =>
            {
                uint maskValue = NetworkHelper.GetPrefixIP(item.PrefixLength);
                IPAddress mask = NetworkHelper.GetPrefixIp(maskValue);
                IPAddress _ip = NetworkHelper.ToNetworkIp(item.Address, maskValue);
                return $"route delete {_ip}";
            }).ToArray();
            if (commands.Length > 0)
            {
                CommandHelper.Windows(string.Empty, commands.ToArray());
            }
        }


        private byte[] buffer = new byte[2 * 1024];
        public unsafe ReadOnlyMemory<byte> Read()
        {
            for (; tokenSource.IsCancellationRequested == false;)
            {
                IntPtr packet = WinTun.WintunReceivePacket(session, out var packetSize);

                if (packet != 0)
                {
                    new Span<byte>((byte*)packet, (int)packetSize).CopyTo(buffer.AsSpan(4, (int)packetSize));
                    ((int)packetSize).ToBytes(buffer);
                    WinTun.WintunReleaseReceivePacket(session, packet);
                    return buffer.AsMemory(0, (int)packetSize + 4);
                }
                else
                {
                    int error = Marshal.GetLastWin32Error();

                    if (error == 0 || error == 259L)
                    {
                        WinTun.WaitForSingleObject(waitHandle, 0xFFFFFFFF);
                    }
                    else
                    {
                        return Helper.EmptyArray;
                    }
                }
            }
            return Helper.EmptyArray;
        }
        public unsafe bool Write(ReadOnlyMemory<byte> buffer)
        {
            if (session == 0 || tokenSource.IsCancellationRequested) return false;

            IntPtr packet = WinTun.WintunAllocateSendPacket(session, (uint)buffer.Length);
            if (packet != 0)
            {
                buffer.Span.CopyTo(new Span<byte>((byte*)packet, buffer.Length));
                WinTun.WintunSendPacket(session, packet);
                return true;
            }
            else
            {
                if (Marshal.GetLastWin32Error() == 111L)
                {
                    return false;
                }
            }
            return false;
        }

        private void GetWindowsInterfaceNum()
        {
            NetworkInterface adapter = NetworkInterface.GetAllNetworkInterfaces()
                    .FirstOrDefault(c => c.Name == Name);
            if (adapter != null)
            {
                interfaceNumber = adapter.GetIPProperties().GetIPv4Properties().Index;
            }
        }

        public void Clear()
        {
            ClearRegistry();
        }
        private void ClearRegistry()
        {
            string[] delValues = [Name];
            try
            {
                RegistryKey key = Registry.LocalMachine.OpenSubKey("SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\NetworkList\\Profiles");
                foreach (var item in key.GetSubKeyNames())
                {
                    RegistryKey itemKey = key.OpenSubKey(item);
                    string value = itemKey.GetValue("Description", string.Empty).ToString();
                    itemKey.Close();
                    if (delValues.Contains(value))
                    {
                        try
                        {
                            Registry.LocalMachine.DeleteSubKey($"SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\NetworkList\\Profiles\\{item}");
                        }
                        catch (Exception)
                        {
                        }
                    }
                }
                key.Close();

                key = Registry.LocalMachine.OpenSubKey("SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\NetworkList\\Signatures\\Unmanaged");
                foreach (var item in key.GetSubKeyNames())
                {
                    RegistryKey itemKey = key.OpenSubKey(item);
                    string value = itemKey.GetValue("Description", string.Empty).ToString();
                    itemKey.Close();
                    if (delValues.Any(c => value.Contains($"{c} ") || value == c))
                    {
                        try
                        {
                            Registry.LocalMachine.DeleteSubKey($"SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\NetworkList\\Signatures\\Unmanaged\\{item}");
                        }
                        catch (Exception)
                        {
                        }
                    }
                }
                key.Close();
            }
            catch (Exception)
            {
            }
        }
    }
}


