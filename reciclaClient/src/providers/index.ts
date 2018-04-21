import { SessionProvider } from "./session";
import { NotificationProvider } from "./notifications";
import { UtilsProvider } from "./utils";
import { GoogleCloudServiceProvider } from "./google";
import { UserProvider } from "./api/userProvider";
import { RecycleItemsProvider } from "./api/recycleItemsProvider";
import { EncryptProvider } from "./encryptProvider";
import { InstagramProvider } from "./instagramProvider";
import { ItemTypeProvider } from "./api/itemTypeProvider";
import { StoragesProvider } from "./api/storagesProvider";

export const APP_PROVIDERS = [
    SessionProvider,
    NotificationProvider,
    UtilsProvider,
    GoogleCloudServiceProvider,
    UserProvider,
    RecycleItemsProvider,
    EncryptProvider,
    InstagramProvider,
    StoragesProvider,
    ItemTypeProvider
];