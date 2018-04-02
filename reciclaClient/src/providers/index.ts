import { SessionProvider } from "./session";
import { NotificationProvider } from "./notifications";
import { UtilsProvider } from "./utils";
import { GoogleCloudServiceProvider } from "./google";
import { UserProvider } from "./api/userProvider";
import { RecycleItemsProvider } from "./api/recycleItemsProvider";
import { EncryptProvider } from "./encryptProvider";

export const APP_PROVIDERS = [
    SessionProvider,
    NotificationProvider,
    UtilsProvider,
    GoogleCloudServiceProvider,
    UserProvider,
    RecycleItemsProvider,
    EncryptProvider
];