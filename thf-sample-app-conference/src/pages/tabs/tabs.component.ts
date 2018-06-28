import { SchedulePage } from '../schedule/schedule.component';
import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about.component';
import { SpeakerListPage } from '../speaker-list/speaker-list.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsPage {

  mySelectedIndex: number;
  tab1Root = SchedulePage;
  tab2Root = SpeakerListPage;
  tab3Root = AboutPage;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
