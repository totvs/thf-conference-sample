import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureDetailPage } from './../lecture-detail/lecture-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

export interface ActionSheetButton {
  cssClass?: string;
  icon?: string;
  role?: string;
  text?: string;
  handler?: () => boolean|void;
}

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {

  actionSheet: ActionSheet;
  speakers = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public config: Config,
    private thfSync: ThfSyncService
  ) {}

  ionViewDidLoad() {
    this.getSpeakers();

    // this.thfSync.onSync().subscribe(() => this.getSpeakers());
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
          text: `Email ( ${speaker.email} )`,
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
    this.thfSync.getModel('Speakers').find().exec().then(data => {
      this.speakers = data.items;
    });
  }

}
