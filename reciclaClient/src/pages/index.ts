import { RecyclePage } from './recycle/recycle';
import { ProfilePage } from './profile/profile';
import { HomePage } from './home/home';
import { TabsPage } from './tabs/tabs';
import { LoginPage } from './login/login';
import { myRecycledItemsPage } from './profile/profile_recycledItems/myRecycledItems';
import { MapPage } from './recycle/recycle_map/recycleMap';
import { PopoverMap } from './recycle/recycle_map/popover_map/popoverMap';
import { recycleItemInfoPage } from './profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo';
import { NormalLoginPage } from './login/normalLogin/normalLogin';
import { NormalRegisterPage } from './login/normalRegister/normalRegister';
import { ProfileEditPage } from './profile/profile_edit/profileEdit';
import { ProfileEditPasswordPage } from './profile/profile_edit/profile_edit_password/profileEditPassword';

export const APP_PAGES = [
    RecyclePage,
    ProfilePage,
    recycleItemInfoPage,
    HomePage,
    TabsPage,
    LoginPage,
    myRecycledItemsPage,
    MapPage,
    PopoverMap,
    NormalLoginPage,
    NormalRegisterPage,
    ProfileEditPage,
    ProfileEditPasswordPage
];