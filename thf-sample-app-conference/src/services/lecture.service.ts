import { Injectable } from '@angular/core';

import { ThfEntity } from '@totvs/thf-sync/models';
import { ThfSyncService } from '@totvs/thf-sync';

@Injectable()
export class LectureService {

  lectureModel: ThfEntity;
  lectures;

  constructor(private thfSync: ThfSyncService) {
    this.lectureModel = this.thfSync.getModel('Lectures');
  }

  getLectures() {
    return this.lectureModel.find().exec().then(data => this.lectures = data.items);
  }

  getModel() {
    return this.lectureModel;
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
