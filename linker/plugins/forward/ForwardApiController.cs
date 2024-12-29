﻿using linker.libs.api;
using linker.libs.extends;
using linker.client.config;
using System.Net;
using linker.libs;
using linker.plugins.forward.proxy;
using linker.tunnel.connection;
using System.Collections.Concurrent;
using linker.plugins.forward.messenger;
using linker.serializer;
using linker.plugins.client;
using linker.plugins.capi;
using linker.plugins.messenger;
using linker.config;
using linker.plugins.access;
using linker.messenger;
using linker.messenger.signin;

namespace linker.plugins.forward
{
    public sealed class ForwardClientApiController : IApiClientController
    {
        private readonly ForwardTransfer forwardTransfer;
        private readonly ForwardProxy forwardProxy;
        private readonly IMessengerSender messengerSender;
        private readonly SignInClientState signInClientState;
        private readonly AccessTransfer accessTransfer;
        private readonly ISignInClientStore signInClientStore;
        private readonly ForwardDecenter forwardDecenter;

        public ForwardClientApiController(ForwardTransfer forwardTransfer, ForwardProxy forwardProxy, IMessengerSender messengerSender, SignInClientState signInClientState, AccessTransfer accessTransfer, ISignInClientStore signInClientStore, ForwardDecenter forwardDecenter)
        {
            this.forwardTransfer = forwardTransfer;
            this.forwardProxy = forwardProxy;
            this.messengerSender = messengerSender;
            this.signInClientState = signInClientState;
            this.accessTransfer = accessTransfer;
            this.signInClientStore = signInClientStore;
            this.forwardDecenter = forwardDecenter;
        }

        public ConnectionListInfo Connections(ApiControllerParamsInfo param)
        {
            ulong hashCode = ulong.Parse(param.Content);
            if (forwardProxy.Version.Eq(hashCode, out ulong version) == false)
            {
                return new ConnectionListInfo
                {
                    List = forwardProxy.GetConnections(),
                    HashCode = version
                };
            }
            return new ConnectionListInfo { HashCode = version };
        }

        [ClientApiAccessAttribute(ClientApiAccess.TunnelRemove)]
        public void RemoveConnection(ApiControllerParamsInfo param)
        {
            forwardProxy.RemoveConnection(param.Content);
        }

        public IPAddress[] BindIPs(ApiControllerParamsInfo param)
        {
            return NetworkHelper.GetIPV4();
        }

        public void Refresh(ApiControllerParamsInfo param)
        {
            forwardDecenter.Refresh();
        }
        public ForwardListInfo GetCount(ApiControllerParamsInfo param)
        {
            ulong hashCode = ulong.Parse(param.Content);
            if (forwardDecenter.DataVersion.Eq(hashCode, out ulong version) == false)
            {
                return new ForwardListInfo
                {
                    List = forwardDecenter.CountDic,
                    HashCode = version
                };
            }
            return new ForwardListInfo { HashCode = version };
        }

        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<List<ForwardInfo>> Get(ApiControllerParamsInfo param)
        {
            if (param.Content == signInClientStore.Id)
            {
                if (accessTransfer.HasAccess(ClientApiAccess.ForwardShowSelf) == false) return new List<ForwardInfo>();
                return forwardTransfer.Get();
            }
            if (accessTransfer.HasAccess(ClientApiAccess.ForwardShowOther) == false) return new List<ForwardInfo>();

            var resp = await messengerSender.SendReply(new MessageRequestWrap
            {
                Connection = signInClientState.Connection,
                MessengerId = (ushort)ForwardMessengerIds.GetForward,
                Payload = Serializer.Serialize(param.Content)
            });
            if (resp.Code == MessageResponeCodes.OK)
            {
                return Serializer.Deserialize<List<ForwardInfo>>(resp.Data.Span);
            }
            return new List<ForwardInfo>();
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<bool> Add(ApiControllerParamsInfo param)
        {
            ForwardAddForwardInfo info = param.Content.DeJson<ForwardAddForwardInfo>();
            if (info.MachineId == signInClientStore.Id)
            {
                if (accessTransfer.HasAccess(ClientApiAccess.ForwardSelf) == false) return false;
                return forwardTransfer.Add(info.Data);
            }
            if (accessTransfer.HasAccess(ClientApiAccess.ForwardOther) == false) return false;

            return await messengerSender.SendOnly(new MessageRequestWrap
            {
                Connection = signInClientState.Connection,
                MessengerId = (ushort)ForwardMessengerIds.AddClientForward,
                Payload = Serializer.Serialize(info)
            });
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public async Task<bool> Remove(ApiControllerParamsInfo param)
        {
            ForwardRemoveForwardInfo info = param.Content.DeJson<ForwardRemoveForwardInfo>();
            if (info.MachineId == signInClientStore.Id)
            {
                if (accessTransfer.HasAccess(ClientApiAccess.ForwardSelf) == false) return false;
                return forwardTransfer.Remove(info.Id);
            }

            if (accessTransfer.HasAccess(ClientApiAccess.ForwardOther) == false) return false;
            return await messengerSender.SendOnly(new MessageRequestWrap
            {
                Connection = signInClientState.Connection,
                MessengerId = (ushort)ForwardMessengerIds.RemoveClientForward,
                Payload = Serializer.Serialize(info)
            });
        }
    }

    public sealed class ForwardListInfo
    {
        public ConcurrentDictionary<string, int> List { get; set; }
        public ulong HashCode { get; set; }
    }
    public sealed class ConnectionListInfo
    {
        public ConcurrentDictionary<string, ITunnelConnection> List { get; set; }
        public ulong HashCode { get; set; }
    }
}
