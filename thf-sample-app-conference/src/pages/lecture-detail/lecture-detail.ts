import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { LectureService } from '../../services/lecture.service';

@Component({
  selector: 'page-lecture-detail',
  templateUrl: 'lecture-detail.html'
})
export class LectureDetailPage {

  lecture;

  constructor(public navParams: NavParams, private lectureService: LectureService) {}

  ionViewWillEnter() {
    this.lectureService.getLecture(this.navParams.data.lectureId).then(lecture => {
      this.lecture = lecture;
    });
  }

}
