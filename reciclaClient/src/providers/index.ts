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
import { QuestionProvider } from "./api/questionProvider";
import { UserQuestionProvider } from "./api/userQuestionProvider";
import { CollectiveProvider } from "./api/collectiveProvider";
import { TipProvider } from "./api/tipProvider";
import { FileProvider } from "./fileProvider";

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
    ItemTypeProvider,
    QuestionProvider,
    UserQuestionProvider,
    CollectiveProvider,
    TipProvider,
    FileProvider
];