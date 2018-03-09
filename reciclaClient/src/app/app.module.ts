import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { APP_PAGES } from '../pages/index';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from "@ionic/storage";
import { SessionProvider } from '../providers/session';

import { HttpModule } from '@angular/http';
import { APP_CONFIG, APP_CONFIG_TOKEN } from './app-config';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { GoogleMaps } from '@ionic-native/google-maps'
import { NotificationProvider } from '../providers/notifications';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service';

@NgModule({
    declarations: [
        MyApp,
        APP_PAGES
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        APP_PAGES
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Facebook,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        SessionProvider,
        NotificationProvider,
        GoogleCloudVisionServiceProvider,
        { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG },
        File,
        Transfer,
        Camera,
        FilePath,
        Geolocation,
        LocationAccuracy,
        GoogleMaps,
        GoogleCloudVisionServiceProvider
    ]
})
export class AppModule { }
