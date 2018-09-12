import { Component, OnInit, ViewChild } from '@angular/core';

import { ThfModalAction } from '@totvs/thf-ui/components/thf-modal/thf-modal-action.interface';
import { ThfModalComponent } from '@totvs/thf-ui/components/thf-modal/thf-modal.component';
import { ThfPageAction, ThfPageFilter } from '@totvs/thf-ui/components/thf-page';
import { ThfSwitchLabelPosition } from '@totvs/thf-ui/components/thf-field';

import { Lecture } from './../model/lecture';
import { LectureService } from './lecture.service';
import { TrackService } from '../track/track.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  actions: Array<ThfPageAction> = [
    { label: 'Create', icon: 'thf-icon-user-add', url: 'lectures/create' }
  ];
  cancel: ThfModalAction = {
    action: () => {
      this.lectureFilterModal.close();
    },
    label: 'Cancelar'
  };
  confirm: ThfModalAction = {
    action: () => {
      this.filterLecturesByTracks();
      this.lectureFilterModal.close();
    },
    label: 'Confirmar'
  };
  displayAll: boolean = true;
  filter: ThfPageFilter = {
    action: this.filterLecturesByTitle.bind(this, 'Filter'),
    advancedAction: this.lectureFilterActionModal.bind(this),
    ngModel: 'lecture',
    placeholder: 'Title'
  };
  filteredTracksId: Array<string> = [];
  labelPosition = ThfSwitchLabelPosition.Left;
  lecture: string;
  lectures: Array<Lecture>;
  lecturesCache: Array<Lecture> = [];
  tracks: Array<any>;

  @ViewChild('lectureFilterModal') lectureFilterModal: ThfModalComponent;

  constructor(private lectureService: LectureService, private trackService: TrackService) { }

  ngOnInit() {
    this.getLectures();
    this.getTracks();
  }

  filterLecturesByTitle() {
    if (this.lecture) {
      this.lectures = this.lectures.filter(lecture => lecture.title.toLowerCase().includes(this.lecture.toLocaleLowerCase()));
    } else {
      this.getLectures();
    }
  }

  filterLecturesByTracks() {
    if (this.filteredTracksId) {
      this.lectures = this.lecturesCache.filter(lecture => (this.filteredTracksId.find(id => id === lecture.track.id)));
    }
  }

  getLectures() {
    this.lectureService.get().subscribe(lectures => {
      this.lectures = lectures.items.filter(lecture => lecture.deleted === false);
      this.lecturesCache = lectures.items.filter(lecture => lecture.deleted === false);
    });
  }

  getTracks() {
    this.trackService.get().subscribe(tracks => {
      this.tracks = tracks.items.filter(track => track.deleted === false).map(track => (Object.assign(track, { model: true })));
    });
  }

  lectureFilterActionModal() {
    this.lectureFilterModal.open();
  }

  selectAllTracks() {
    this.tracks.forEach(track => {
      if (this.displayAll) {
        Object.assign(track, { model: true });
        this.pushTrackInSelectedFilter(track.id);
      } else {
        Object.assign(track, { model: false });
        this.popTrackInSelectedFilter(track.id);
      }
    });
  }

  selectTrack(trackId: string) {
    if (this.filteredTracksId.includes(trackId)) {
      this.popTrackInSelectedFilter(trackId);
    } else {
      this.pushTrackInSelectedFilter(trackId);
    }
  }

  private popTrackInSelectedFilter(trackId: string) {
    if (this.filteredTracksId.includes(trackId)) {
      const id = this.filteredTracksId.findIndex(trkId => trkId === trackId);
      this.filteredTracksId.splice(id, 1);
    }
  }

  private pushTrackInSelectedFilter(trackId: string) {
    if (!this.filteredTracksId.includes(trackId)) {
      this.filteredTracksId.push(trackId);
    }
  }

}
