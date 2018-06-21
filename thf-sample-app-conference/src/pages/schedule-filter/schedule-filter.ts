import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { TrackService } from './../../services/track.service';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  providers: [ TrackService ]
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean, color: string}> = [];

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private trackService: TrackService
  ) {
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

  getTracks() {
    const excludedTrackNames = this.navParams.data;

    this.trackService.getTracks().then(tracks => {
      this.tracks = tracks.map(track => {
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
