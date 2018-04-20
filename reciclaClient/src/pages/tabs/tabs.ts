import { Component, ViewChild } from '@angular/core';

import { RecyclePage } from '../recycle/recycle';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { IonicPage, Events, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild(Tabs) tabs: Tabs;

    tab1Root = HomePage;
    tab2Root = RecyclePage;
    tab3Root = ProfilePage;
    tab3Params = { profileSegment: "profile" };

    constructor(
        private events: Events
    ) {
        events.subscribe('change-tab', (tab, profileSegment = '') => {
            if (profileSegment != '') {
                this.tab3Params.profileSegment = profileSegment;
            }
            this.tabs.select(tab);
        });
    }
}
