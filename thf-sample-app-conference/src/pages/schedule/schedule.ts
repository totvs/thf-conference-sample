import { Component } from '@angular/core';

import {
  AlertController,
  App,
  ItemSliding,
  ModalController,
  NavController,
  Refresher,
} from 'ionic-angular';

import { LectureDetailPage } from './../lecture-detail/lecture-detail';
import { LectureService } from '../../services/lecture.service';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  excludeTracks: any = [];
  filteredLectures = [];
  lectures = [];
  queryText = '';
  segment = 'all';
  userId;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private lectureService: LectureService,
    private userService: UserService,
  ) {}

  ionViewWillEnter() {
    this.app.setTitle('Schedule');
    this.updateSchedule();

    this.userService.getLoggedUser().then(user => this.userId = user);
  }

  addFavorite(slidingItem: ItemSliding, lecture) {
    this.userService.addFavoriteLecture(lecture.id).then(() => {
      const alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => slidingItem.close()
        }]
      });
      alert.present();

    }).catch(() => this.removeFavorite(slidingItem, lecture.id, lecture.title));

  }

  doRefresh(refresher: Refresher) {
    // Validar se está funcionando depois de fazer o diff da lecture
    this.lectureService.synchronize().then(() => {
      refresher.complete();
    });
  }

  getColorTrack(color) {
    return { 'border-left': `2px solid ${color}` };
  }

  goToSessionDetail(lectureid) {
    this.navCtrl.push(LectureDetailPage, { lectureId: lectureid });
  }

  lectureFilter() {
    this.filteredLectures = this.lectures.filter(lecture => {
      const isNotExcludeTrack = !this.excludeTracks.includes(lecture.track.name);
      const isEqualQueryText = lecture['title'].toLowerCase().includes(this.queryText);

      return this.queryText ? isEqualQueryText && isNotExcludeTrack : isNotExcludeTrack;
    });

    if (this.segment === 'favorites') {
      this.lectureFavoriteFilter()
        .then(favoriteLectures => this.filteredLectures = favoriteLectures);
    }

  }

  presentFilter() {
    const modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: Array<any>) => {
      if (data) {
        this.excludeTracks = data;
        this.lectureFilter();
      }
    });

  }

  removeFavorite(slidingItem: ItemSliding, lectureId: any, title: string) {
    const alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        { text: 'Cancel', handler: () => slidingItem.close() },
        {
          text: 'Remove',
          handler: () => {
            this.userService.removeFavoriteLecture(lectureId).then(() => {
              this.lectureFilter();
              slidingItem.close();
            });
          }
        }
      ]
    });
    alert.present();
  }

  private async lectureFavoriteFilter() {
    const favoriteLectures = await this.userService.getFavoriteLectures();
    return this.filteredLectures.filter(lecture => favoriteLectures.includes(lecture.id));
  }

  private updateSchedule() {
    this.lectureService.getLectures().then(lectures => {
      this.lectures = lectures;
      this.filteredLectures = this.lectures;
    });

  }

}
