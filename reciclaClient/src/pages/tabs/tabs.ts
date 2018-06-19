import { Component, ViewChild } from '@angular/core';

import { RecyclePage } from '../recycle/recycle';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { IonicPage, Events, Tabs } from 'ionic-angular';
import { RankingPage } from '../ranking/ranking';
import { GamePage } from '../game/game';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild(Tabs) tabs: Tabs;

    tabHomeRoot = HomePage;
    tabGameRoot = GamePage
    tabRecycleRoot = RecyclePage;
    tabRankingRoot = RankingPage;
    tabProfileRoot = ProfilePage;
    tabProfileRootParams = { profileSegment: "profile" };

    constructor(
        private events: Events
    ) {
        this.events.subscribe('change-tab', (tabName, profileSegment = '') => {
            if (profileSegment != '') {
                this.tabProfileRootParams.profileSegment = profileSegment;
            }
            var tab = 0
            switch (tabName) {
                case "home":
                    tab = 0
                    break
                case "game":
                    tab = 1
                    break
                case "recycle":
                    tab = 2
                    break
                case "ranking":
                    tab = 3
                    break
                case "profile":
                    tab = 4
                    break
            }
            this.tabs.select(tab);
        });
    }
}
