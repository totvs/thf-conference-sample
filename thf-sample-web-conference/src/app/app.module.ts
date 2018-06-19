import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GenericService } from './generic/service/generic.service';
import { LectureCardComponent } from './lecture/lecture-card/lecture-card.component';
import { LectureComponent } from './lecture/lecture.component';
import { LectureService } from './lecture/lecture.service';
import { SpeakerCardComponent } from './speaker/speaker-card/speaker-card.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakerDetailComponent } from './speaker/speaker-detail/speaker-detail.component';
import { SpeakerEditComponent } from './speaker/speaker-edit/speaker-edit.component';
import { SpeakerService } from './speaker/speaker.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,

    ThfModule
  ],
  declarations: [
    AppComponent,
    LectureCardComponent,
    LectureComponent,
    SpeakerCardComponent,
    SpeakerComponent,
    SpeakerDetailComponent,
    SpeakerEditComponent
  ],
  providers: [
    GenericService,
    LectureService,
    SpeakerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
