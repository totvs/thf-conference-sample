import { Component } from '@angular/core';

import { NavController, NavParams, Refresher } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { SpeakerService } from './../../services/speaker.service';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.component.html'
})
export class SpeakerDetailPage {

  speaker;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private speakerService: SpeakerService,
    private thfSync: ThfSyncService,
  ) {
    this.thfSync.onSync().subscribe(() => this.loadSpeaker());
  }

  ionViewWillEnter() {
    this.loadSpeaker();
  }

  doRefresh(refresher: Refresher) {
    this.speakerService.synchronize().then(() => refresher.complete());
  }

  sendMail() {
    window.open('mailto:', this.speaker.email);
  }

  private loadSpeaker() {
    this.thfSync.getModel('Speakers').findById(this.navParams.data.speakerId).exec().then(speaker => {
      this.speaker = speaker;
    });
  }

}
