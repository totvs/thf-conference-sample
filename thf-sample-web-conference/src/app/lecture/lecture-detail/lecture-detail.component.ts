import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ThfDialogService } from '@totvs/thf-ui/services/thf-dialog/thf-dialog.service';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { Lecture } from './../../model/lecture';
import { LectureService } from '../lecture.service';

@Component({
  selector: 'app-lecture-detail',
  templateUrl: './lecture-detail.component.html',
  styleUrls: ['./lecture-detail.component.css']
})
export class LectureDetailComponent implements OnInit {

  lecture: Lecture = new Lecture();
  title: string;

  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private router: Router,
    private thfAlert: ThfDialogService,
    private thfNotification: ThfNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getLectureById(params['id'].toString());
      }
    });
  }

  back() {
    window.history.back();
  }

  edit() {
    this.navigateToPath(`lectures/edit/${this.lecture.id}`);
  }

  getLectureById(id: string) {
    this.lectureService.getById(id).subscribe(lecture => {
      this.lecture = lecture;
      this.title = `Lecture ${this.lecture.title} detail`;
    }, error => {
      this.thfNotification.error(error.status + ' ' + error.statusText);
    });
  }

  remove() {
    this.thfAlert.confirm({
      title: 'Do you want to delete this lecture?',
      message: `Are you sure you want to delete the ${this.lecture.title} lecture?`,
      confirm: () => {
        this.lectureService.delete(this.lecture.id).subscribe(lectureId => {
          this.thfNotification.success(`Lecture deleted successfully!`);
          this.navigateToPath('lectures');
        }, error => {
          this.thfNotification.error(error.status + ' ' + error.statusText);
        });
      },
      cancel: undefined
    });
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }

}
