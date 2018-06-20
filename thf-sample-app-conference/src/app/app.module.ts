import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ThfStorageModule } from '@totvs/thf-storage';
import { ThfSyncModule } from '@totvs/thf-sync';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LectureDetailPage } from './../pages/lecture-detail/lecture-detail';
import { LoginPage } from './../pages/login/login';
import { MyApp } from './app.component';
import { ScheduleFilterPage } from './../pages/schedule-filter/schedule-filter';
import { SchedulePage } from './../pages/schedule/schedule';
import { SignupPage } from './../pages/signup/signup';
import { SpeakerDetailPage } from './../pages/speaker-detail/speaker-detail';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    AboutPage,
    ContactPage,
    HomePage,
    LectureDetailPage,
    LoginPage,
    MyApp,
    ScheduleFilterPage,
    SchedulePage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
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
    AboutPage,
    ContactPage,
    HomePage,
    LectureDetailPage,
    LoginPage,
    MyApp,
    ScheduleFilterPage,
    SchedulePage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage
  ],
  providers: [
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
