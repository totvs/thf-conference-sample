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

  speakers: Array<Speaker>;
  speakerName: string;
  actions: Array<ThfPageAction> = [
    { label: 'Create', icon: 'thf-icon-user-add', url: 'speakers/create' }
  ];
  filter: ThfPageFilter = {
    action: this.showAction.bind(this, 'Filter'),
    ngModel: 'speakerName',
    placeholder: 'Name'
  };

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.getSpeakers();
  }

  getSpeakers() {
    this.speakerService.get().subscribe(speakers => this.speakers = speakers.items);
  }

  showAction() {
    this.speakers = this.speakers.filter(speaker => speaker.name.toLowerCase().includes(this.speakerName.toLocaleLowerCase()));
  }
}
