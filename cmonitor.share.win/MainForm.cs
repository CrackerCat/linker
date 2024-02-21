using cmonitor.libs;
using RDPCOMAPILib;
using System.Diagnostics;

namespace cmonitor.share.win
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
        private readonly byte[] bytes;
        private long version = 0;
        public MainForm(string key, int size)
        {
            InitializeComponent();

            bytes = new byte[size];
            shareMemory = new ShareMemory(key, 1, size);
            shareMemory.InitLocal();
        }

        private void OnLoad(object sender, EventArgs e)
        {
#if RELEASE
            this.FormBorderStyle = FormBorderStyle.None;
            this.ShowInTaskbar = false;
            this.WindowState = FormWindowState.Maximized;
#endif
            TopMost = true;
            CheckRunning();
        }

        private void CheckRunning()
        {
            hook.Start();
            shareMemory.AddAttribute(0, ShareMemoryAttribute.Running);
            Task.Run(async () =>
            {
                while (true)
                {
                    try
                    {
                        if (shareMemory.ReadAttributeEqual(0, ShareMemoryAttribute.Closed))
                        {
                            shareMemory.RemoveAttribute(0, ShareMemoryAttribute.Running);
                            hook.Close();
                            Application.ExitThread();
                            Application.Exit();
                            Process.GetCurrentProcess().Kill();
                        }
                    }
                    catch (Exception)
                    {
                    }
                    await Task.Delay(1000);
                }

            });
        }

        private void OpenShareDesktop()
        {
            RDPSession session = new RDPSession();
            session.OnAttendeeConnected += Session_OnAttendeeConnected;
            // �������湲��
            session.Open();

            IRDPSRAPIInvitation invitation = session.Invitations.CreateInvitation("�����������Ȩ", "�ҵĹ���Ự", "123", 1024);
            string invitationString = invitation.ConnectionString;

            Console.WriteLine("�뽫���������ַ����ṩ��Զ�̿ͻ��ˣ�");
            Console.WriteLine(invitationString);

            // �ȴ��رմ���
            Console.WriteLine("��������ر�...");
            Console.ReadKey();

            session.Close();
        }
        private void Session_OnAttendeeConnected(object pAttendee)
        {
            IRDPSRAPIAttendee attendee = (IRDPSRAPIAttendee)pAttendee;
            // ���ÿͻ��˷���Ȩ��Ϊ ViewOnly
            attendee.ControlLevel = CTRL_LEVEL.CTRL_LEVEL_VIEW;
        }
    }
}
