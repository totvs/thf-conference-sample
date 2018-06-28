import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetButton,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController,
  Refresher,
} from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureDetailPage } from '../lecture-detail/lecture-detail.component';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail.component';
import { SpeakerService } from '../../services/speaker.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.component.html'
})
export class SpeakerListPage {

  actionSheet: ActionSheet;
  speakers = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public config: Config,
    private speakerService: SpeakerService,
    private thfSync: ThfSyncService
  ) {}

  ionViewWillEnter() {
    this.getSpeakers();

    this.thfSync.onSync().subscribe(() => this.getSpeakers());
  }

  doRefresh(refresher: Refresher) {
    this.speakerService.synchronize().then(() => refresher.complete());
  }

  goToLectureDetail(lecture: any) {
    this.navCtrl.push(LectureDetailPage, { lectureId: lecture.id });
  }

  goToSpeakerDetail(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }

  openContact(speaker: any) {
    const mode = this.config.get('mode');

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: speaker.email,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  private getSpeakers() {
    this.speakerService.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

}
