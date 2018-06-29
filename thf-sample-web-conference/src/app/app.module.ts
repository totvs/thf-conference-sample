import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConferenceModule } from './conference/conference.module';
import { HomeModule } from './home/home.module';
import { LectureModule } from './lecture/lecture.module';
import { LoginService } from './login/login.service';
import { SharedModule } from './shared/shared.module';
import { SpeakerModule } from './speaker/speaker.module';
import { TrackModule } from './track/track.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    ConferenceModule,
    HomeModule,
    LectureModule,
    SpeakerModule,
    TrackModule,

    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
