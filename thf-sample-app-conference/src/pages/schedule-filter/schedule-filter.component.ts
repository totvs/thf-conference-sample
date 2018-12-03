import { Component } from '@angular/core';

import { NavParams, ViewController, Refresher } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { TrackService } from './../../services/track.service';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.component.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean, color: string}> = [];

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private trackService: TrackService,
    private thfSync: ThfSyncService
  ) {
    this.thfSync.onSync().subscribe(() => this.getTracks());
  }

  ionViewWillEnter() {
    this.getTracks();
  }

  applyFilters() {
    const excludedTrackNames = this.tracks
      .filter(track => !track.isChecked)
      .map(track => track.name);

    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  doRefresh(refresher: Refresher) {
    this.trackService.synchronize().then(() => refresher.complete());
  }

  getTracks() {
    const excludedTrackNames = this.navParams.data;

    this.trackService.getTracks().then(tracks => {
      this.tracks = tracks.map((track: any) => {
        return {
          name: track.name,
          color: track.color,
          isChecked: !excludedTrackNames.includes(track.name)
        };
      });
    });
  }

  resetFilters() {
    this.tracks.forEach(track => track.isChecked = true);
  }

}
