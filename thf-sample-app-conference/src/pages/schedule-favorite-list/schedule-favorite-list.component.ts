import { SchedulePage } from './../schedule/schedule.component';
import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'schedule-favorite-list',
  templateUrl: 'schedule-favorite-list.component.html'
})
export class ScheduleFavoriteList {

  lectures;
  lecturesFavorited = [];
  lecturesListToFavor = [];
  selectAllLectures: boolean;
  showCheckbox: boolean;
  userId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) {
    this.lectures = this.navParams.data.lectures;
    this.getLecturesFavorited();
  }

  selectAll() {
    this.selectAllLectures = !this.selectAllLectures;
  }

  async getLecturesFavorited() {
    this.lecturesFavorited = await this.userService.getFavoriteLectures();
  }

  addLisToFavor(lectureId) {
    const indexLecture = this.lecturesListToFavor.indexOf(lectureId);

    if (indexLecture < 0) {
      this.lecturesListToFavor.push(lectureId);
    } else {
      this.lecturesListToFavor.splice(indexLecture, 1);
    }
  }

  async favoriteLectures() {
    try {
      await this.userService.addFavoriteLectureList(this.lecturesListToFavor);
      this.navCtrl.setRoot(SchedulePage);
    } catch {
      console.log('erro');
    }

  }

}
