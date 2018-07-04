import { NgModule } from '@angular/core';

import { CardCountModule } from './../generic/card-count/card-count.module';
import { HomeComponent } from './home.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { LectureService } from './../lecture/lecture.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CardCountModule,

    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HomeDashboardComponent,
  ],
  providers: [
    LectureService
  ]
})
export class HomeModule { }
