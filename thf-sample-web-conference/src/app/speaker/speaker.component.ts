import { Component, OnInit } from '@angular/core';

import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';

import { SpeakerService } from './speaker.service';
import { Speaker } from '../model/speaker';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {

  actions: Array<ThfPageAction> = [
    { label: 'Create', icon: 'thf-icon-user-add', url: 'speakers/create' }
  ];
  filter: ThfPageFilter = {
    action: this.filterSpeakersByName.bind(this, 'Filter'),
    ngModel: 'speakerName',
    placeholder: 'Name'
  };
  speakers: Array<Speaker>;
  speakerName: string;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.getSpeakers();
  }

  filterSpeakersByName() {
    if (this.speakerName) {
      this.speakers = this.speakers.filter(speaker => speaker.name.toLowerCase().includes(this.speakerName.toLocaleLowerCase()));
    } else {
      this.getSpeakers();
    }
  }

  getSpeakers() {
    this.speakerService.get().subscribe(speakers => {
      this.speakers = speakers.items.filter(speaker => speaker.deleted === false);
    });
  }

}
