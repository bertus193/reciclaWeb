import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
//import { AboutPage } from '../about/about';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    FB_APP_ID: number = 138106000230935;


    constructor(public navCtrl: NavController, public fb: Facebook) {
        this.fb.browserInit(this.FB_APP_ID, "v2.8");
    }

    doFbLogin() {
        let permissions = new Array<string>();
        //let nav = this.navCtrl;

        //the permissions your facebook app needs from the user
        permissions = ["public_profile"];

        this.fb.login(permissions)
            .then((response) => {
                let userId = response.authResponse.userID;
                let params = new Array<string>();

                //Getting name and gender properties
                this.fb.api("/me?fields=name,gender", params)
                    .then((user) => {
                        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                        console.log(user.name)
                        //now we have the users info, let's save it in the NativeStorage
                        /*this.nativeStorage.setItem('user',
                            {
                                name: user.name,
                                gender: user.gender,
                                picture: user.picture
                            })
                            .then(() => {
                                //nav.push(AboutPage);
                            }, (error) => {
                                console.log(error);
                            })*/
                    })
            }, (error) => {
                console.log(error);
            });
    }

}
