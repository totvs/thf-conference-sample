import { Component } from '@angular/core';

import {
  AlertController,
  App,
  ItemSliding,
  ModalController,
  NavController,
  Refresher,
} from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureDetailPage } from '../lecture-detail/lecture-detail.component';
import { LectureService } from '../../services/lecture.service';
import { ScheduleFavoriteList } from './../schedule-favorite-list/schedule-favorite-list.component';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter.component';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.component.html'
})
export class SchedulePage {

  excludeTracks: any = [];
  favoriteSegment = 'favorites';
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
    private thfSync: ThfSyncService,
  ) { }

  ionViewWillEnter() {
    this.updateSchedule();

    this.thfSync.onSync().subscribe(() => {
      this.updateSchedule();
    });

    this.userService.getLoggedUser().then(user => this.userId = user);
  }

  addFavorite(slidingItem: ItemSliding, lecture) {
    this.userService.addFavoriteLectureList(lecture.id).then(() => {
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
    this.lectureService.synchronize().then(() => refresher.complete());
  }

  getColorTrack(color) {
    return { 'border-left': `2px solid ${color}` };
  }

  goToSessionDetail(lectureid) {
    this.navCtrl.push(LectureDetailPage, { lectureId: lectureid });
  }

  lectureFilter() {
    const lectures = this.lectures.filter(lecture => {
      const isNotExcludeTrack = !this.excludeTracks.includes(lecture.track.name);
      const isEqualQueryText = lecture['title'].toLowerCase().includes(this.queryText);

      return this.queryText ? isEqualQueryText && isNotExcludeTrack : isNotExcludeTrack;
    });

    if (this.segment === this.favoriteSegment) {
      this.lectureFavoriteFilter(lectures)
        .then(favoriteLectures => this.filteredLectures = favoriteLectures);
    } else {
      this.filteredLectures = lectures;
    }

  }

  async lecturePress() {
    if (this.userId) {
      const favoriteLectures = await this.userService.getFavoriteLectures();
      this.navCtrl.push(ScheduleFavoriteList, { lectures: this.lectures, favoriteLectures: favoriteLectures });
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

  private async lectureFavoriteFilter(lectures) {
    const favoriteLectures = await this.userService.getFavoriteLectures();
    return lectures.filter(lecture => favoriteLectures && favoriteLectures.includes(lecture.id));
  }

  private updateSchedule() {
    this.lectureService.getLectures().then(lectures => {
      this.lectures = lectures;
      this.lectureFilter();
    });

  }

}
