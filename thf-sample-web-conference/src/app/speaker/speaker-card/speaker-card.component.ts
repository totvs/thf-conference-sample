import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Speaker } from '../../model/speaker';

@Component({
  selector: 'speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.css']
})
export class SpeakerCardComponent {

  /** Objeto do tipo Speaker referente a palestrante. */
  @Input('speaker') speaker: Speaker;

  constructor(private router: Router) { }

  detail() {
    this.router.navigate([`speakers/detail/${this.speaker.id}`]);
  }

  edit() {
    this.router.navigate([`speakers/edit/${this.speaker.id}`]);
  }

}
