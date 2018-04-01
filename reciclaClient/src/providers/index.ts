import { SessionProvider } from "./session";
import { NotificationProvider } from "./notifications";
import { UtilsProvider } from "./utils";
import { GoogleCloudServiceProvider } from "./google";
import { UserProvider } from "./api/userProvider";

export const APP_PROVIDERS = [
    SessionProvider,
    NotificationProvider,
    UtilsProvider,
    GoogleCloudServiceProvider,
    UserProvider
];