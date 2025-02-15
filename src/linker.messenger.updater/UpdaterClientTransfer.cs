﻿using linker.libs;
using System.Collections.Concurrent;
using linker.messenger.signin;
using linker.libs.extends;

namespace linker.messenger.updater
{
    public sealed class UpdaterClientTransfer
    {
        private UpdaterInfo updateInfo = new UpdaterInfo();
        private ConcurrentDictionary<string, UpdaterInfo> updateInfos = new ConcurrentDictionary<string, UpdaterInfo>();
        private ConcurrentDictionary<string, LastTicksManager> subscribes = new ConcurrentDictionary<string, LastTicksManager>();

        private readonly IMessengerSender messengerSender;
        private readonly SignInClientState signInClientState;
        private readonly UpdaterHelper updaterHelper;
        private readonly ISignInClientStore signInClientStore;
        private readonly IUpdaterCommonStore updaterCommonTransfer;
        private readonly ISerializer serializer;

        public VersionManager Version { get; } = new VersionManager();

        public UpdaterClientTransfer(IMessengerSender messengerSender, SignInClientState signInClientState, UpdaterHelper updaterHelper, ISignInClientStore signInClientStore, IUpdaterCommonStore updaterCommonTransfer, ISerializer serializer)
        {
            this.messengerSender = messengerSender;
            this.signInClientState = signInClientState;
            this.updaterHelper = updaterHelper;
            this.signInClientStore = signInClientStore;
            this.updaterCommonTransfer = updaterCommonTransfer;
            this.serializer = serializer;

            signInClientState.NetworkFirstEnabledHandle += Init;

        }
        private void Init()
        {
            LoadTask();
            UpdateTask();
            updateInfo.Update();
        }

        /// <summary>
        /// 所有客户端的更新信息
        /// </summary>
        /// <returns></returns>
        public ConcurrentDictionary<string, UpdaterInfo> Get()
        {
            return updateInfos;
        }
        /// <summary>
        /// 确认更新
        /// </summary>
        public void Confirm(string version)
        {
            updaterHelper.Confirm(updateInfo, version);
        }
        /// <summary>
        /// 来自别的客户端的更新信息
        /// </summary>
        /// <param name="info"></param>
        public void Update(UpdaterInfo info)
        {
            if (string.IsNullOrWhiteSpace(info.MachineId) == false)
            {
                updateInfos.AddOrUpdate(info.MachineId, info, (a, b) => info);
                Version.Add();
            }
        }


        private readonly LastTicksManager lastTicksManager = new LastTicksManager();
        public void Subscribe(string machineId)
        {
            if (subscribes.TryGetValue(machineId, out LastTicksManager _lastTicksManager) == false)
            {
                _lastTicksManager = new LastTicksManager();
                subscribes.TryAdd(machineId, _lastTicksManager);
                updateInfo.Update();
            }

            //距离上次订阅超过一分钟，需要立即更新一次
            bool needUpdate = _lastTicksManager.DiffGreater(60 * 1000);
            _lastTicksManager.Update();
            lastTicksManager.Update();

            if (needUpdate)
            {
                updateInfo.Update();
            }
        }

        public void Check()
        {
            if (LoggerHelper.Instance.LoggerLevel <= LoggerTypes.DEBUG)
                LoggerHelper.Instance.Info($"check update");
            _ = updaterHelper.GetUpdateInfo(updateInfo);
        }

        private void UpdateTask()
        {
            TimerHelper.SetInterval(async () =>
            {
                if (updateInfo.Updated)
                {
                    updateInfo.MachineId = signInClientStore.Id;
                    string[] machines = subscribes.Where(c => c.Value.DiffLessEqual(15000)).Select(c => c.Key).ToArray();
                    if (machines.Length > 0)
                    {
                        await messengerSender.SendOnly(new MessageRequestWrap
                        {
                            Connection = signInClientState.Connection,
                            MessengerId = (ushort)UpdaterMessengerIds.UpdateForward,
                            Payload = serializer.Serialize(new UpdaterClientInfo { ToMachines = machines, Info = updateInfo }),
                        });
                    }
                    Update(updateInfo);
                }
                return true;
            }, () => lastTicksManager.DiffLessEqual(5000) ? 1000 : 15000);

        }
        private void LoadTask()
        {
            TimerHelper.SetInterval(async () =>
            {
                if (updaterCommonTransfer.CheckUpdate)
                {
                    await updaterHelper.GetUpdateInfo(updateInfo);
                }
                return true;
            }, () => updaterCommonTransfer.UpdateIntervalSeconds * 1000);
        }
    }



}
