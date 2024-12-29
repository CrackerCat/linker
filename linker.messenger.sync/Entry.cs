﻿using linker.libs.api;
using Microsoft.Extensions.DependencyInjection;
using IApiServer = linker.messenger.api.IApiServer;
namespace linker.messenger.sync
{
    public static class Entry
    {
        public static ServiceCollection AddSyncClient(this ServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<SyncTreansfer>();
            serviceCollection.AddSingleton<SyncClientMessenger>();
            serviceCollection.AddSingleton<SyncApiController>();
            return serviceCollection;
        }
        public static ServiceProvider UseSyncClient(this ServiceProvider serviceProvider)
        {
            IMessengerResolver messengerResolver= serviceProvider.GetService<IMessengerResolver>();
            messengerResolver.AddMessenger(new List<IMessenger> { serviceProvider.GetService<SyncClientMessenger>() });

            IApiServer apiServer = serviceProvider.GetService<IApiServer>();
            apiServer.AddPlugins(new List<IApiController> { serviceProvider.GetService<SyncApiController>() });

            return serviceProvider;
        }

        public static ServiceCollection AddSyncServer(this ServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<SyncServerMessenger>();
            return serviceCollection;
        }
        public static ServiceProvider UseSyncServer(this ServiceProvider serviceProvider)
        {
            IMessengerResolver messengerResolver = serviceProvider.GetService<IMessengerResolver>();
            messengerResolver.AddMessenger(new List<IMessenger> { serviceProvider.GetService<SyncServerMessenger>() });

            return serviceProvider;
        }
    }
}
