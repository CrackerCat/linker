using cmonitor.libs;
using cmonitor.viewer.server.win.Properties;
using common.libs;
using Microsoft.Win32;
using RDPCOMAPILib;
using System.Data.SqlTypes;
using System.Diagnostics;
using System.Resources;
using System.Text;
using System.Windows.Forms;
using System.Xml;

namespace cmonitor.viewer.server.win
{
    public partial class MainForm : Form
    {
        protected override CreateParams CreateParams
        {
            get
            {
                const int WS_EX_APPWINDOW = 0x40000;
                const int WS_EX_TOOLWINDOW = 0x80;
                CreateParams cp = base.CreateParams;
                cp.ExStyle &= (~WS_EX_APPWINDOW);
                cp.ExStyle |= WS_EX_TOOLWINDOW;
                return cp;
            }
        }

        private readonly Hook hook = new Hook();
        private readonly ShareMemory shareMemory;
        private int shareIndex = 0;
        private Mode shareMode = Mode.Client;
        private const string shareClientExe = "cmonitor.viewer.client.win";
        private byte[] shareKeyBytes = Encoding.UTF8.GetBytes(shareClientExe);

        public MainForm(string key, int length, int size, int index, Mode mode)
        {
            InitializeComponent();

            shareMode = mode;
            shareIndex = index;
            shareMemory = new ShareMemory(key, length, size);
            shareMemory.InitLocal();
        }

        private void OnLoad(object sender, EventArgs e)
        {
#if RELEASE
            this.FormBorderStyle = FormBorderStyle.None;
            this.ShowInTaskbar = false;
            this.WindowState = FormWindowState.Minimized;
            this.Visible = false;
#endif

            FireWallHelper.Write(Path.GetFileNameWithoutExtension(System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName));
            CheckRunning();

            if (shareMode == Mode.Client)
            {
                OpenShareClient();
            }
            else
            {
                OpenShareDesktop();
            }
        }
        private void CheckRunning()
        {
            hook.Close();
            shareMemory.AddAttribute(shareIndex, ShareMemoryAttribute.Running);
            shareMemory.RemoveAttribute(shareIndex, ShareMemoryAttribute.Closed);
            Task.Run(async () =>
            {
                while (true)
                {
                    try
                    {
                        if (shareMemory.ReadAttributeEqual(shareIndex, ShareMemoryAttribute.Closed))
                        {
                            CloseServer();
                        }
                        else
                        {
                            shareMemory.IncrementVersion(shareIndex);
                        }
                        if (Process.GetProcessesByName(shareClientExe).Length == 0)
                        {
                            shareMemory.AddAttribute(shareIndex, ShareMemoryAttribute.Error);
                        }
                    }
                    catch (Exception)
                    {
                    }
                    await Task.Delay(30);
                }

            });
        }
        private void CloseServer()
        {
            shareMemory.RemoveAttribute(shareIndex, ShareMemoryAttribute.Running);
            CloseShareClient();
            CloseShareDesktop();
            Application.ExitThread();
            Application.Exit();
            Process.GetCurrentProcess().Kill();
        }

        private void OpenShareClient()
        {
            hook.Start((code) => { return true; });

            CommandHelper.Windows(string.Empty, new string[] { $"start {shareClientExe}.exe" }, false);
        }
        private void CloseShareClient()
        {
            hook.Close();
            CommandHelper.Windows(string.Empty, new string[] { $"taskkill /f /im {shareClientExe}.exe" });
        }


        private RDPSession session;
        private NotifyIcon notifyIcon;
        private string invitationString;
        private void OpenShareDesktop()
        {
            notifyIcon = new NotifyIcon();
            notifyIcon.Visible = true;
            notifyIcon.ContextMenuStrip = new ContextMenuStrip();
            //notifyIcon.ContextMenuStrip.Items.Add("连接串");
            notifyIcon.ContextMenuStrip.Items.Add("刷新共享");
            notifyIcon.ContextMenuStrip.Items.Add("退出");
            notifyIcon.ContextMenuStrip.ItemClicked += (object sender, ToolStripItemClickedEventArgs e) =>
            {

                if (e.ClickedItem.Text == "退出")
                {
                    CloseServer();
                }
                else if (e.ClickedItem.Text == "刷新共享")
                {
                    NewShare();
                }
                else if (e.ClickedItem.Text == "连接串")
                {
                    //MessageBox.Show(invitationString);
                }
            };
            NewShare();
        }
        private void NewShare()
        {
            Task.Run(() =>
            {
                try
                {
                    string guid = Guid.NewGuid().ToString();
                    CloseShareDesktop();
                    session = new RDPSession();
                    session.SetDesktopSharedRect(0, 0, Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height);
                    session.OnAttendeeConnected += Session_OnAttendeeConnected;
                    session.Open();
                    IRDPSRAPIInvitation invitation = session.Invitations.CreateInvitation(guid, "snltty", "snltty", 1024);
                    invitationString = invitation.ConnectionString;

                    /*
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(invitationString);
                    XmlElement newLNode = xmlDoc.CreateElement("L");
                    newLNode.SetAttribute("P", "12345");
                    newLNode.SetAttribute("N", "192.168.1.35");
                    xmlDoc.DocumentElement["C"]["T"].AppendChild(newLNode);
                    Debug.WriteLine(xmlDoc.OuterXml);
                    */

                    Registry.SetValue("HKEY_CURRENT_USER\\SOFTWARE\\Cmonitor", "viewerConnectStr", invitationString);

                    notifyIcon.Icon = Icon.FromHandle(Resources.logo_share_green.GetHicon());
                    notifyIcon.Text = "正在共享桌面";
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex + "");
                    //MessageBox.Show(ex.Message);
                    notifyIcon.Icon = Icon.FromHandle(Resources.logo_share_gray.GetHicon());
                    notifyIcon.Text = "共享失败";
                }
            });
        }


        private void Session_OnAttendeeConnected(object pAttendee)
        {
            IRDPSRAPIAttendee attendee = (IRDPSRAPIAttendee)pAttendee;
            attendee.ControlLevel = CTRL_LEVEL.CTRL_LEVEL_VIEW;
        }
        private void CloseShareDesktop()
        {
            try
            {
                session?.Close();
                Registry.SetValue("HKEY_CURRENT_USER\\SOFTWARE\\Cmonitor", "viewerConnectStr", string.Empty);
            }
            catch (Exception)
            {
            }
        }
    }

    public enum Mode : byte
    {
        Client = 0,
        Server = 1,
    }
}
