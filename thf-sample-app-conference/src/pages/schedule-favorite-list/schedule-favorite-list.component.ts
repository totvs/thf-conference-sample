import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { SchedulePage } from './../schedule/schedule.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'schedule-favorite-list',
  templateUrl: 'schedule-favorite-list.component.html'
})
export class ScheduleFavoriteList {

  favoriteAll: boolean;
  lectures;
  lecturesFavorited: Array<number> = [];
  lecturesListToFavor: Array<number> = [];
  selectAllLectures: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.lectures = this.navParams.data.lectures;
    this.lecturesFavorited = this.navParams.data.favoriteLectures || [];
    this.favoriteAll = this.checkFavoriteAll();
  }

  addLisToFavor(lectureId) {
    const indexLecture = this.lecturesListToFavor.indexOf(lectureId);

    if (indexLecture < 0) {
      this.lecturesListToFavor.push(lectureId);
    } else {
      this.lecturesListToFavor.splice(indexLecture, 1);
    }
  }

  checkFavoriteAll() {
    return !this.lectures.some(lecture => this.lecturesFavorited.indexOf(lecture.id) < 0);
  }

  async favoriteLectures() {
    try {
      await this.userService.addFavoriteLectureList(this.lecturesListToFavor);
      this.navCtrl.setRoot(SchedulePage);
    } catch (error) {
      this.createToast(error);
    }

  }

  selectAll() {
    this.selectAllLectures = !this.selectAllLectures;
  }

  private createToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: 'toaster'
    });
    toast.present();
  }

}
