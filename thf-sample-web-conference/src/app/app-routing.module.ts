import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LectureComponent } from './lecture/lecture.component';
import { LectureDetailComponent } from './lecture/lecture-detail/lecture-detail.component';
import { LectureEditComponent } from './lecture/lecture-edit/lecture-edit.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakerDetailComponent } from './speaker/speaker-detail/speaker-detail.component';
import { SpeakerEditComponent } from './speaker/speaker-edit/speaker-edit.component';
import { ThfPageBlockedUserComponent, ThfPageChangePasswordComponent } from '@totvs/thf-templates';

const routes: Routes = [

  {
    path: 'access-denied',
    component: ThfPageBlockedUserComponent,
    data: {
      contactEmail: 'user@totvs.com.br',
      contactPhone: '0800 709 8100',
      reason: 'exceededAttempts',
      urlBack: '/login'
    }
  },
  {
    path: 'new-password',
    component: ThfPageChangePasswordComponent,
    data: {
      serviceApi: 'http://localhost:8080/conference-api/api/v1/auth/new-password',
      hideCurrentPassword: true
    }
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
      { path: 'conferences', loadChildren: 'app/conference/conference.module#ConferenceModule' },
      {
        path: 'lectures',
        children: [
          { path: '', component: LectureComponent },
          { path: 'create', component: LectureEditComponent },
          { path: 'detail/:id', component: LectureDetailComponent },
          { path: 'edit/:id', component: LectureEditComponent }
        ]
      },
      {
        path: 'speakers',
        children: [
          { path: '', component: SpeakerComponent },
          { path: 'create', component: SpeakerEditComponent },
          { path: 'detail/:id', component: SpeakerDetailComponent },
          { path: 'edit/:id', component: SpeakerEditComponent }
        ]
      },
      { path: 'tracks', loadChildren: 'app/track/track.module#TrackModule' },
      { path: '**', redirectTo: '/home', pathMatch: 'full'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
