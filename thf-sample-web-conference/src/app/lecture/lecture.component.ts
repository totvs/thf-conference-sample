import { Component, OnInit } from '@angular/core';

import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';

import { Lecture } from './../model/lecture';
import { LectureService } from './lecture.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  actions: Array<ThfPageAction> = [
    { label: 'Create', icon: 'thf-icon-user-add', url: 'lectures/create' }
  ];
  filter: ThfPageFilter = {
    action: this.filterLecturesByTitle.bind(this, 'Filter'),
    ngModel: 'lecture',
    placeholder: 'Title'
  };
  lecture: string;
  lectures: Array<Lecture>;

  constructor(private lectureService: LectureService) { }

  ngOnInit() {
    this.getLectures();
  }

  filterLecturesByTitle() {
    this.lectures = this.lectures.filter(lecture => lecture.title.toLowerCase().includes(this.lecture.toLocaleLowerCase()));
  }

  getLectures() {
    this.lectureService.get().subscribe(lectures => {
      this.lectures = lectures.items.filter(lecture => lecture.deleted === false);
    });
  }

}
