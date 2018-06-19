import { Component, OnInit } from '@angular/core';

import { Lecture } from './../model/lecture';
import { LectureService } from './lecture.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  lectures: Array<Lecture>;

  constructor(private lectureService: LectureService) { }

  ngOnInit() {
    this.getLectures();
  }

  getLectures() {
    this.lectureService.get().subscribe(lectures => {
      this.lectures = lectures.items.filter(lecture => lecture.deleted === false);
    });
  }

}
