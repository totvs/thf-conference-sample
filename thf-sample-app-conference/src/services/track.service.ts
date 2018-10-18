import { Injectable } from '@angular/core';

import { ThfSyncService, ThfResponseApi } from '@totvs/thf-sync';

@Injectable()
export class TrackService {

  constructor(private thfSync: ThfSyncService) {}

  async getTracks() {
    return await this.thfSync.getModel('Tracks').find().exec().then((tracks: ThfResponseApi) => tracks.items);
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
