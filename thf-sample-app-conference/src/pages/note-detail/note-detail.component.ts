import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { NoteService } from '../../services/note.service';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.component.html'
})
export class NoteDetailPage {
  note = { title: 'New note', text: null };
  newNote;

  constructor(public navParams: NavParams, private noteService: NoteService) {
    this.initNote();
  }

  async initNote() {
    const note = await this.noteService.getNote(this.navParams.data.lectureId);
    note ? this.note = note : this.newNote = true;
  }

  saveNote() {

  }

}
