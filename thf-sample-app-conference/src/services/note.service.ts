import { Injectable } from '@angular/core';

import { ThfSyncService } from '@totvs/thf-sync';

import { UserService } from './user.service';

@Injectable()
export class NoteService {
  constructor(private thfSync: ThfSyncService, private userService: UserService) {}

  async getNote(lectureId) {
    const notes = await this.getNotes();
    return notes.find(note => note.lectureId === lectureId);
  }

  async getNotes() {
    const user = await this.userService.getLoggedUser();
    return user.notes;
  }

  save(note) {
    const noteModel = this.thfSync.getModel('Notes');
    noteModel.save(note);
  }

}
