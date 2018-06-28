import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ThfDialogService } from '@totvs/thf-ui/services/thf-dialog/thf-dialog.service';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';

import { Lecture } from '../../model/lecture';
import { LectureService } from '../../lecture/lecture.service';
import { Speaker } from '../../model/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.css']
})
export class SpeakerDetailComponent implements OnInit {

  lectures: Array<Lecture> = new Array<Lecture>();
  speaker: Speaker = new Speaker();
  title: string;

  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private router: Router,
    private speakerService: SpeakerService,
    private thfAlert: ThfDialogService,
    private thfNotification: ThfNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getSpeakerById(params['id'].toString());
      }
    });
  }

  back() {
    window.history.back();
  }

  edit() {
    this.navigateToPath(`speakers/edit/${this.speaker.id}`);
  }

  getSpeakerById(id: string) {
    this.speakerService.getById(id).subscribe(speaker => {
      this.speaker = speaker;
      this.title = `Speaker ${this.speaker.name} detail`;

      this.getLecturesForSpeaker();
    }, error => {
      this.thfNotification.error(error.status + ' ' + error.statusText);
    });
  }

  remove() {
    this.thfAlert.confirm({
      title: 'Do you want to delete this speaker?',
      message: `Are you sure you want to delete the ${this.speaker.name} speaker?`,
      confirm: () => {
        this.speakerService.delete(this.speaker.id).subscribe(speakerId => {
          this.thfNotification.success(`Speaker deleted successfully!`);
          this.navigateToPath('speakers');
        }, error => {
          this.thfNotification.error(error.status + ' ' + error.statusText);
        });
      },
      cancel: undefined
    });
  }

  private getLecturesForSpeaker() {
    if (this.speaker) {
      this.speaker.lectures.forEach(lecture => {
        this.lectureService.getById(lecture.id).subscribe(lect => {
          this.lectures.push(lect);
        });
      });
    }
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }

}
