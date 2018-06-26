import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NoteDetailPage } from './../note-detail/note-detail.component';
import { NoteService } from './../../services/note.service';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.component.html'
})
export class NotesPage {
  notes;

  constructor(public navCtrl: NavController, private noteService: NoteService) {
    this.loadNotes();
  }

  async loadNotes() {
    this.notes = await this.noteService.getNotes();
  }

  goToNoteDetail(lectureId) {
    this.navCtrl.push(NoteDetailPage, { lectureId: lectureId });
  }

}
