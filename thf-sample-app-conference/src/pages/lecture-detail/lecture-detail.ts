import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

@Component({
  selector: 'page-lecture-detail',
  templateUrl: 'lecture-detail.html'
})
export class LectureDetailPage {
  lecture: any;

  constructor(public navParams: NavParams, private thfSync: ThfSyncService) {}

  ionViewWillEnter() {
    this.thfSync.getModel('Lectures').findById(this.navParams.data.lectureId).exec().then(lecture => {
      this.lecture = lecture;
    });
  }
}
