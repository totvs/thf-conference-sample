import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ThfModule } from '@totvs/thf-ui';
import { ThfPageLoginModule } from '@totvs/thf-templates/components/thf-page-login';
import { ThfStorageModule } from '@totvs/thf-storage';
import { ThfSyncModule } from '@totvs/thf-sync';

import { AboutPage } from '../pages/about/about.component';
import { ConferenceService } from './../services/conference.service';
import { LectureDetailPage } from '../pages/lecture-detail/lecture-detail.component';
import { LectureService } from '../services/lecture.service';
import { LoginPage } from '../pages/login/login.component';
import { MyApp } from './app.component';
import { NoteDetailPage } from './../pages/note-detail/note-detail.component';
import { NoteListPage } from './../pages/note-list/note-list.component';
import { NoteService } from './../services/note.service';
import { ScheduleFavoriteList } from '../pages/schedule-favorite-list/schedule-favorite-list.component';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter.component';
import { SchedulePage } from '../pages/schedule/schedule.component';
import { SignupPage } from '../pages/signup/signup.component';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail.component';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list.component';
import { SpeakerService } from '../services/speaker.service';
import { TabsPage } from '../pages/tabs/tabs.component';
import { TrackService } from '../services/track.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    AboutPage,
    LectureDetailPage,
    LoginPage,
    MyApp,
    NoteDetailPage,
    NoteListPage,
    ScheduleFavoriteList,
    ScheduleFilterPage,
    SchedulePage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    ThfModule,
    ThfSyncModule,
    ThfStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    ThfPageLoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AboutPage,
    LectureDetailPage,
    LoginPage,
    MyApp,
    NoteDetailPage,
    NoteListPage,
    ScheduleFavoriteList,
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
    ConferenceService,
    Network,
    NoteService,
    UserService,
    TrackService,
    SpeakerService,
    LectureService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
