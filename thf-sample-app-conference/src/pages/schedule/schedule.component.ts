import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  AlertController,
  App,
  ItemSliding,
  ModalController,
  NavController,
  Refresher,
  PopoverController,
} from 'ionic-angular';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureDetailPage } from '../lecture-detail/lecture-detail.component';
import { LectureService } from '../../services/lecture.service';
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
  showCheckbox = false;
  selectAllLectures = false;
  lecturesListToFavor = [];

  @ViewChild('popover', { read: ElementRef }) popover: ElementRef;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
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

  selectAll() {
    this.selectAllLectures = !this.selectAllLectures;
  }

  addLisToFavor(lectureId) {
    const indexLecture = this.lecturesListToFavor.indexOf(lectureId);

    if (indexLecture < 0) {
      this.lecturesListToFavor.push(lectureId);
    } else {
      this.lecturesListToFavor.splice(indexLecture, 1);
    }
    console.log(this.lecturesListToFavor);
  }

  presentPopover(event) {
    const popover = this.popoverCtrl.create(this.popover);
    popover.present({
      ev: event
    });
  }

  lecturePress(event) {
    this.showCheckbox = !!this.userId;
  }

  async favoriteLectures() {
    try {
      await this.userService.addFavoriteLectureList(this.lecturesListToFavor);
      this.backSelect();
      console.log('ok');
    } catch {
      console.log('erro');
    }

  }

  backSelect() {
    this.showCheckbox = false;
    this.lecturesListToFavor.length = 0;
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
