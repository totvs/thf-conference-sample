import { ThfSyncService } from '@totvs/thf-sync';
import { Injectable } from '@angular/core';

@Injectable()
export class ConferenceService {

  constructor(private thfSync: ThfSyncService) {}

  getConference() {
    return this.getConferenceModel().findOne().exec();
  }

  private getConferenceModel() {
    return this.thfSync.getModel('Conferences');
  }

}
