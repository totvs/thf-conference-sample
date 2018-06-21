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

  async getLecture(lectureId) {
    return await this.thfSync.getModel('Lectures').findById(lectureId).exec();
  }

  getLectures() {
    return this.lectureModel.find().exec().then(data => this.lectures = data.items);
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
