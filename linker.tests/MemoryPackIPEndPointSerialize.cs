
using linker.config;
using linker.plugins.serializes;
using linker.plugins.signin.messenger;
using linker.plugins.tuntap.config;
using linker.tunnel.connection;
using linker.tunnel.transport;
using MemoryPack;
using System.Net;

namespace linker.Tests
{
    [TestClass]
    public class MemoryPackIPEndPointSerialize
    {
        [TestMethod]
        public void Serialize()
        {
            MemoryPackFormatterProvider.Register(new IPEndPointFormatter());
            MemoryPackFormatterProvider.Register(new IPAddressFormatter());




            byte[] bytes = MemoryPackSerializer.Serialize(new SignInListRequestInfo1
            {
                GroupId = string.Empty,
                Ids =[],
                Name = "11",
                Page = 1,
                Size = 1,
            });

            SignInListRequestInfo tuntapInfos1 = MemoryPackSerializer.Deserialize<SignInListRequestInfo>(bytes);

            Assert.AreEqual(tuntapInfos1.Name, "11");
        }
    }

    [MemoryPackable]
    public sealed partial class SignInListRequestInfo1
    {
        /// <summary>
        /// ��ǰҳ
        /// </summary>
        public int Page { get; set; } = 1;
        /// <summary>
        /// ÿҳ��С
        /// </summary>
        public int Size { get; set; } = 10;
        /// <summary>
        /// ���ڷ���
        /// </summary>
        public string GroupId { get; set; }
        /// <summary>
        /// ����������
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// ��id��ȡ
        /// </summary>
        public string[] Ids { get; set; }
    }


}