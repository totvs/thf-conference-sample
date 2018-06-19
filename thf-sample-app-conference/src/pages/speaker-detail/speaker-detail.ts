import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker;

  constructor(public navCtrl: NavController, public navParams: NavParams, private thfSync: ThfSyncService) { }

  ionViewWillEnter() {
    this.thfSync.getModel('Speakers').findById(this.navParams.data.speakerId).exec().then(speaker => {
      this.speaker = speaker;
    });

  }

  sendMail() {
    window.open('mailto:', this.speaker.email);
  }
}
