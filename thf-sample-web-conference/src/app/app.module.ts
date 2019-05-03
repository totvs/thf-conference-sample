import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardCountModule } from './generic/card-count/card-count.module';
import { ConferenceModule } from './conference/conference.module';
import { HomeModule } from './home/home.module';
import { LectureModule } from './lecture/lecture.module';
import { NoteModule } from './note/note.module';
import { SharedModule } from './shared/shared.module';
import { SpeakerModule } from './speaker/speaker.module';
import { TrackModule } from './track/track.module';

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
    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
