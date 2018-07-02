import { Component, OnInit } from '@angular/core';

import { LectureService } from '../../lecture/lecture.service';
import { NoteService } from '../../note/note.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { TrackService } from '../../track/track.service';

@Component({
  selector: 'home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  countLectures: number;
  countSpeakers: number;
  countTracks: number;
  countNotes: number;
  iconLectures: string = 'thf-icon-chat';
  iconTracks: string = 'thf-icon-stock';
  iconSpeakers: string = 'thf-icon-user';
  iconNotes: string = 'thf-icon-document';
  lectures: string = 'lectures';
  speakers: string = 'speakers';
  tracks: string = 'tracks';
  notes: string = 'notes';

  constructor(
    private lectureService: LectureService,
    private trackService: TrackService,
    private noteService: NoteService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit() {
    this.getCountLectures();
    this.getCountSpeakers();
    this.getCountTracks();
    this.getCountNotes();
  }

  getCountLectures(): void {
    this.lectureService.getCount().subscribe(length => this.countLectures = length);
  }

  getCountSpeakers(): void {
    this.speakerService.getCount().subscribe(length => this.countSpeakers = length);
  }

  getCountTracks() {
    this.trackService.getCount().subscribe(length => this.countTracks = length);
  }

  getCountNotes() {
    this.noteService.getCount().subscribe(length => this.countNotes = length);
  }

}
