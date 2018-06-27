import { Component } from '@angular/core';

import { ConferenceService } from './../../services/conference.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.component.html'
})
export class AboutPage {
  conference;

  constructor(private conferenceService: ConferenceService) { }

  ionViewDidLoad() {
    this.loadConference();
  }

  async loadConference() {
    this.conference = await this.conferenceService.getConference();
  }

}
