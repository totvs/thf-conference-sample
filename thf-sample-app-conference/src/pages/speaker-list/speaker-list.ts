import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { ThfSyncService } from '@totvs/thf-sync';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

// import { ConferenceData } from '../../providers/conference-data';

// import { SessionDetailPage } from '../session-detail/session-detail';
// import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    // public confData: ConferenceData,
    public config: Config,
    private thfSync: ThfSyncService
    // public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.thfSync.getModel('Speakers').find().exec().then(data => {
      this.speakers = data.items;
    })
  }

  goToSessionDetail(session: any) {
    // this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToSpeakerDetail(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }

  // goToSpeakerTwitter(speaker: any) {
  //   this.inAppBrowser.create(
  //     `https://twitter.com/${speaker.twitter}`,
  //     '_blank'
  //   );
  // }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
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
}
