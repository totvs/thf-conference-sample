import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardCountModule } from './generic/card-count/card-count.module';
import { ConferenceModule } from './conference/conference.module';
import { HomeModule } from './home/home.module';
import { LectureModule } from './lecture/lecture.module';
import { LoginService } from './login/login.service';
import { NoteModule } from './note/note.module';
import { SharedModule } from './shared/shared.module';
import { SpeakerModule } from './speaker/speaker.module';
import { TrackModule } from './track/track.module';
import { ThfPageBlockedUserModule, ThfPageLoginModule, ThfPageChangePasswordModule, ThfModalPasswordRecoveryModule } from '@totvs/thf-templates';
import { BlockedUserComponent } from './blocked-user/blocked-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    CardCountModule,
    ConferenceModule,
    HomeModule,
    LectureModule,
    NoteModule,
    SpeakerModule,
    TrackModule,
    SharedModule,
    ThfPageLoginModule,
    ThfPageBlockedUserModule,
    ThfPageChangePasswordModule,
    ThfModalPasswordRecoveryModule,
  ],
  declarations: [
    AppComponent,
    BlockedUserComponent,
    ChangePasswordComponent
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
