import { ThfSyncService } from '@totvs/thf-sync';
import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean, color: string}> = [];

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private thfSync: ThfSyncService
  ) {
    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.data;

    this.thfSync.getModel('Tracks').find().exec().then(data => {
      this.tracks = data.items.map(track => {
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

  applyFilters() {
    const excludedTrackNames = this.tracks
      .filter(track => !track.isChecked)
      .map(track => track.name);

    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
