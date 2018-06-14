import { Component, Input } from '@angular/core';

import { Speaker } from '../../model/speaker';

@Component({
  selector: 'speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.css']
})
export class SpeakerCardComponent {

  @Input('speaker') speaker: Speaker;

  constructor() { }

  edit() {
    alert('edit speaker: ' + this.speaker.name);
  }

}
