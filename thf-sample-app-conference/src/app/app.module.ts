import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { ThfSyncModule } from '@totvs/thf-sync';
import { ThfStorageModule } from '@totvs/thf-storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LectureDetailPage } from './../pages/lecture-detail/lecture-detail';
import { LoginPage } from './../pages/login/login';
import { MyApp } from './app.component';
import { SignupPage } from './../pages/signup/signup';
import { SpeakerDetailPage } from './../pages/speaker-detail/speaker-detail';
import { TabsPage } from '../pages/tabs/tabs';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LectureDetailPage,
    LoginPage,
    SignupPage,
    SpeakerListPage,
    SpeakerDetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    ThfSyncModule,
    ThfStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LectureDetailPage,
    LoginPage,
    SignupPage,
    SpeakerListPage,
    SpeakerDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
