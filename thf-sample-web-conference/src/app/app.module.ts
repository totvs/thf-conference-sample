import { GenericService } from './generic/service/generic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ThfModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LectureComponent } from './lecture/lecture.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakerEditComponent } from './speaker/speaker-edit/speaker-edit.component';
import { SpeakerCardComponent } from './speaker/speaker-card/speaker-card.component';
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
    SpeakerComponent,
    LectureComponent,
    SpeakerEditComponent,
    SpeakerCardComponent
  ],
  providers: [
    GenericService,
    SpeakerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
