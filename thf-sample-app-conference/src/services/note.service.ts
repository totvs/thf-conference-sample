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
    return notes.find(note => note.lectureId === lectureId);
  }

  async getNotes() {
    const user = await this.userService.getLoggedUser();
    const notes = await this.getNoteModel().find().exec();
    return notes.items.filter(note => note.userId === user.id);
  }

  remove(note) {
    return this.getNoteModel().remove(note);
  }

  async save(note2) {
    const notes = [
      {title: 'Note 1', text: '1', lectureId: '1', userId: '1'},
      {title: 'Note 2', text: '2', lectureId: '2', userId: '1'},
      {title: 'Note 3', text: '3', lectureId: '3', userId: '1'},
    ];
    console.log(notes);

    for (const note of notes) {
      console.log(note);
      await this.getNoteModel().save(note);
      console.log('terminou await: ', note.title);
    }
    // return this.getNoteModel().save(note);
  }

  synchronize() {
    return this.thfSync.sync();
  }

}
