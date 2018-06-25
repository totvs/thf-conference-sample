import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ThfStorageModule } from '@totvs/thf-storage';
import { ThfSyncModule } from '@totvs/thf-sync';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LectureDetailPage } from './../pages/lecture-detail/lecture-detail';
import { LectureService } from '../services/lecture.service';
import { LoginPage } from './../pages/login/login';
import { MyApp } from './app.component';
import { NoteDetailPage } from './../pages/note-detail/note-detail.component';
import { NotesPage } from './../pages/notes/notes.component';
import { NoteService } from './../services/note.service';
import { ScheduleFilterPage } from './../pages/schedule-filter/schedule-filter';
import { SchedulePage } from './../pages/schedule/schedule';
import { SignupPage } from './../pages/signup/signup';
import { SpeakerDetailPage } from './../pages/speaker-detail/speaker-detail';
import { SpeakerService } from '../services/speaker.service';
import { TabsPage } from '../pages/tabs/tabs';
import { TrackService } from '../services/track.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    AboutPage,
    HomePage,
    LectureDetailPage,
    LoginPage,
    MyApp,
    NoteDetailPage,
    NotesPage,
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
    HomePage,
    LectureDetailPage,
    LoginPage,
    MyApp,
    NoteDetailPage,
    NotesPage,
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
    NoteService,
    UserService,
    TrackService,
    SpeakerService,
    LectureService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
