import { Component } from '@angular/core';

import { NavController, Refresher } from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { NoteDetailPage } from './../note-detail/note-detail.component';
import { NoteService } from './../../services/note.service';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.component.html'
})
export class NotesPage {
  notes;

  constructor(
    public navCtrl: NavController,
    private noteService: NoteService,
    private thfSync: ThfSyncService
  ) { }

  ionViewDidLoad() {
    this.loadNotes();
    this.thfSync.onSync().subscribe(() => this.loadNotes());
  }

  async loadNotes() {
    this.notes = await this.noteService.getNotes();
  }

  goToNoteDetail(lectureId) {
    this.navCtrl.push(NoteDetailPage, { lectureId: lectureId });
  }

  doRefresh(refresher: Refresher) {
    this.noteService.synchronize().then(() => refresher.complete());
  }

}
