import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectureComponent } from './lecture/lecture.component';
import { LectureDetailComponent } from './lecture/lecture-detail/lecture-detail.component';
import { LectureEditComponent } from './lecture/lecture-edit/lecture-edit.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakerDetailComponent } from './speaker/speaker-detail/speaker-detail.component';
import { SpeakerEditComponent } from './speaker/speaker-edit/speaker-edit.component';

const routes: Routes = [
  { path: 'home', component: SpeakerComponent },
  { path: 'lectures', component: LectureComponent },
  { path: 'lectures/create', component: LectureEditComponent },
  { path: 'lectures/detail/:id', component: LectureDetailComponent },
  { path: 'lectures/edit/:id', component: LectureEditComponent },
  { path: 'speakers', component: SpeakerComponent },
  { path: 'speakers/create', component: SpeakerEditComponent },
  { path: 'speakers/detail/:id', component: SpeakerDetailComponent },
  { path: 'speakers/edit/:id', component: SpeakerEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
