import { RecyclePage } from './recycle/recycle';
import { ProfilePage } from './profile/profile';
import { HomePage } from './home/home';
import { TabsPage } from './tabs/tabs';
import { LoginPage } from './login/login';
import { recycleFinishPage } from './recycle/recycle_finish/recycleFinish';
import { myRecycledItemsPage } from './profile/profile_recycledItems/myRecycledItems';
import { MapPage } from './recycle/recycle_map/recycleMap';
import { PopoverMap } from './recycle/recycle_map/popover_map/popoverMap';

export const APP_PAGES = [
    RecyclePage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    recycleFinishPage,
    myRecycledItemsPage,
    MapPage,
    PopoverMap
];