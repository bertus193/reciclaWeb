import { Component } from '@angular/core';

import { RecyclePage } from '../recycle/recycle';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = RecyclePage;
    tab3Root = ProfilePage;

    constructor() {

    }
}
