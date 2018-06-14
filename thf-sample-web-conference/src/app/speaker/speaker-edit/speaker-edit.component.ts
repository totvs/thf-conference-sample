import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

import { Speaker } from './../../model/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})
export class SpeakerEditComponent {

  @Input('speaker') speaker: Speaker = this.speakerRestore();

  action: string;
  photoOptions: Array<ThfSelectOption> = [{
    value: 'avatar1.png',
    label: 'Picture 1'
  }, {
    value: 'avatar2.png',
    label: 'Picture 2'
  }, {
    value: 'avatar3.png',
    label: 'Picture 3'
  }, {
    value: 'avatar4.png',
    label: 'Picture 4'
  }, {
    value: 'avatar5.png',
    label: 'Picture 5'
  }, {
    value: 'avatar6.png',
    label: 'Picture 6'
  }, {
    value: 'avatar7.png',
    label: 'Picture 7'
  }, {
    value: 'avatar8.png',
    label: 'Picture 8'
  }];

  constructor(
    private speakerService: SpeakerService,
    private thfNotification: ThfNotificationService,
    private router: Router
  ) { }

  cancel() {
    this.navigateToUrl('speakers');
  }

  save(isSaveNew?: boolean) {
    this.speakerService.create(this.speaker).subscribe(speaker => {
      this.thfNotification.success(`Speaker ${speaker.name} created successfully!`);
      if (!isSaveNew) {
        this.navigateToUrl('speakers');
      }
    }, error => {
      this.thfNotification.error(error.status + ' ' + error.statusText);
    });
  }

  saveNew() {
    this.save(true);
    this.speakerRestore();
  }

  private navigateToUrl(url: string) {
    this.router.navigate([url]);
  }

  private speakerRestore(): Speaker {
    return this.speaker = {
      name: undefined,
      email: undefined,
      description: undefined,
      photo: undefined
    };
  }

}
