import { Injectable } from '@angular/core';

import { ThfSyncService, ThfResponseApi } from '@totvs/thf-sync';

@Injectable()
export class SpeakerService {

  constructor(private thfSync: ThfSyncService) {}

  async getSpeakers() {
    return await this.thfSync.getModel('Speakers').find().sort('name').exec().then((speakers: ThfResponseApi) => speakers.items);
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
