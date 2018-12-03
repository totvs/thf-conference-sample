import { Injectable } from '@angular/core';

import { ThfSyncService } from '@totvs/thf-sync';

import { UserService } from './user.service';

@Injectable()
export class NoteService {
  constructor(private thfSync: ThfSyncService, private userService: UserService) {}

  getNoteModel() {
    return this.thfSync.getModel('Notes');
  }

  async getNote(lectureId) {
    const notes = await this.getNotes();
    return notes.find((note: any) => note.lectureId === lectureId);
  }

  async getNotes() {
    const user: any = await this.userService.getLoggedUser();
    const notes: any = await this.getNoteModel().find().exec();
    return notes.items.filter((note: any) => note.userId === user.id);
  }

  remove(note) {
    return this.getNoteModel().remove(note);
  }

  save(note) {
    return this.getNoteModel().save(note);
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
