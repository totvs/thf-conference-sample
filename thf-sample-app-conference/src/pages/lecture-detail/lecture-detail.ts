import { Component } from '@angular/core';

import { NavParams, Refresher } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureService } from '../../services/lecture.service';

@Component({
  selector: 'page-lecture-detail',
  templateUrl: 'lecture-detail.html'
})
export class LectureDetailPage {

  lecture;

  constructor(public navParams: NavParams, private lectureService: LectureService, private thfSync: ThfSyncService) {
    this.thfSync.onSync().subscribe(() => this.loadLecture());
  }

  ionViewWillEnter() {
    this.loadLecture();
  }

  doRefresh(refresher: Refresher) {
    this.lectureService.synchronize().then(() => refresher.complete());
  }

  private loadLecture() {
    this.lectureService.getLecture(this.navParams.data.lectureId).then(lecture => {
      this.lecture = lecture;
    });
  }

}
