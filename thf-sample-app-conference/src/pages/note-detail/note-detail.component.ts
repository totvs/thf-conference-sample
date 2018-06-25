import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { NoteService } from '../../services/note.service';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.component.html'
})
export class NoteDetailPage {
  note = { title: 'New note', text: null, lectureId: undefined, userId: undefined };
  newNote;

  constructor(
    public navParams: NavParams,
    private noteService: NoteService,
    private userService: UserService
  ) {
    this.initNote();
  }

  async initNote() {
    const note = await this.noteService.getNote(this.navParams.data.lectureId);
    note ? this.note = note : this.newNote = true;
  }

  async saveNote() {
    this.note.lectureId = this.navParams.data.lectureId;
    this.note.userId = await this.userService.getLoggedUserId();

    this.noteService.save(this.note);
  }

}
