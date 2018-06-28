import { Injectable } from '@angular/core';

import { ThfSyncService } from '@totvs/thf-sync';

@Injectable()
export class SpeakerService {

  constructor(private thfSync: ThfSyncService) {}

  async getSpeakers() {
    const speakersResponse = await this.thfSync.getModel('Speakers').find().sort('name').exec();
    return speakersResponse.items;
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
