import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

import { NavParams, Refresher, NavController } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureService } from '../../services/lecture.service';
import { NoteDetailPage } from '../note-detail/note-detail.component';

@Component({
  selector: 'page-lecture-detail',
  templateUrl: 'lecture-detail.component.html'
})
export class LectureDetailPage {

  lecture;
  isLogged = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lectureService: LectureService,
    private thfSync: ThfSyncService,
    private userService: UserService,
  ) {
    this.userService.getLoggedUserId().then(user => this.isLogged = !!user);
  }

  ionViewDidLoad() {
    this.loadLecture();
    this.thfSync.onSync().subscribe(() => this.loadLecture());
  }

  doRefresh(refresher: Refresher) {
    this.lectureService.synchronize().then(() => refresher.complete());
  }

  goToNoteDetail() {
    this.navCtrl.push(NoteDetailPage, { lectureId: this.lecture.id });
  }

  private loadLecture() {
    this.lectureService.getLecture(this.navParams.data.lectureId).then(lecture => {
      this.lecture = lecture;
    });
  }

}
