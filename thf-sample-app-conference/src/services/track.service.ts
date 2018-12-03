import { Injectable } from '@angular/core';

import { ThfSyncService } from '@totvs/thf-sync';

@Injectable()
export class TrackService {

  constructor(private thfSync: ThfSyncService) {}

  async getTracks() {
    const tracksResponse: any = await this.thfSync.getModel('Tracks').find().exec();
    return tracksResponse.items;
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
