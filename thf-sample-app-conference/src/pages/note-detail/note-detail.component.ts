import { Component } from '@angular/core';

import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import { LectureDetailPage } from './../lecture-detail/lecture-detail';
import { NoteService } from '../../services/note.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.component.html'
})
export class NoteDetailPage {
  note = { title: 'New note', text: null, lectureId: undefined, userId: undefined };

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private noteService: NoteService,
    private userService: UserService,
  ) {
    this.initNote();
  }
  alertRemoveNote() {
    console.log('alert');
    const alert = this.alertCtrl.create({
      title: `Remove ${this.note.title}`,
      message: 'Would you like to remove this note?',
      buttons: [
        { text: 'Cancel', handler: () => {} },
        { text: 'Remove',  handler: () => this.removeNote() }
      ]
    });
    alert.present();
  }

  async saveNote() {
    this.note.lectureId = this.navParams.data.lectureId;
    this.note.userId = await this.userService.getLoggedUserId();

    await this.noteService.save(this.note);

    const toast = this.toastCtrl.create({
      message: 'Saved note',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();

    // this.navCtrl.setRoot(this.navCtrl.getActive().component, this.navParams.data);
  }

  private async initNote() {
    const note = await this.noteService.getNote(this.navParams.data.lectureId);
    this.note = note || this.note;
  }

  private async removeNote() {
    console.log(this.noteService);
    await this.noteService.remove(this.note);
    this.navCtrl.push(LectureDetailPage, { lectureId: this.note.lectureId });
  }

}
