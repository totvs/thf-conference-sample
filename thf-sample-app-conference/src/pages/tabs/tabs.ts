import { SchedulePage } from './../schedule/schedule';
import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  isLogged = false;
  mySelectedIndex: number;
  tab1Root = SchedulePage;
  tab2Root = SpeakerListPage;
  tab3Root = AboutPage;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
