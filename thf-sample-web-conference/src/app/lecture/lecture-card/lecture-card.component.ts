import { Component, Input } from '@angular/core';

import { Lecture } from './../../model/lecture';

@Component({
  selector: 'lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent {

  @Input('lecture') lecture: Lecture = undefined;

  constructor() { }

  getCardDescription() {
    return this.lecture.startTime + ' - ' + this.lecture.endTime + ' : ' + this.lecture.room;
  }

}
