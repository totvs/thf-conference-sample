import { Component, ViewChild } from '@angular/core';

import { ThfSyncService } from '@totvs/thf-sync';

import { LectureDetailPage } from './../lecture-detail/lecture-detail';

import {
  AlertController,
  App,
  FabContainer,
  ItemSliding,
  List,
  LoadingController,
  ModalController,
  NavController,
  Refresher,
  ToastController
} from 'ionic-angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  confDate: string;
  dayIndex = 0;
  excludeTracks: any = [];
  filteredLectures = [];
  groups: any = [];
  lectures = [];
  queryText = '';
  segment = 'all';
  shownSessions: any = [];

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private thfSync: ThfSyncService
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    this.thfSync.getModel('Lectures').find().exec().then(data => {
      this.lectures = data.items;
      this.filteredLectures = this.lectures;
    });

  }

  lectureFilter() {
    this.filteredLectures = this.lectures.filter(lecture => {
      const isNotExcludeTrack = !this.excludeTracks.includes(lecture.track.name);
      const isEqualQueryText = lecture['title'].toLowerCase().includes(this.queryText);

      return this.queryText ? isEqualQueryText && isNotExcludeTrack : isNotExcludeTrack;
    });

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

  getColorTrack(color) {
    return { 'border-left': `2px solid ${color}` };
  }

  goToSessionDetail(lectureid) {
    this.navCtrl.push(LectureDetailPage, { lectureId: lectureid });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    // if (this.user.hasFavorite(sessionData.name)) {
    //   // woops, they already favorited it! What shall we do!?
    //   // prompt them to remove it
    //   this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    // } else {
    //   // remember this session as a user favorite
    //   this.user.addFavorite(sessionData.name);

    //   // create an alert instance
    //   let alert = this.alertCtrl.create({
    //     title: 'Favorite Added',
    //     buttons: [{
    //       text: 'OK',
    //       handler: () => {
    //         // close the sliding item
    //         slidingItem.close();
    //       }
    //     }]
    //   });
    //   // now present the alert on top of all other content
    //   alert.present();
    // }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    // let alert = this.alertCtrl.create({
    //   title: title,
    //   message: 'Would you like to remove this session from your favorites?',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: () => {
    //         // they clicked the cancel button, do not remove the session
    //         // close the sliding item and hide the option buttons
    //         slidingItem.close();
    //       }
    //     },
    //     {
    //       text: 'Remove',
    //       handler: () => {
    //         // they want to remove this session from their favorites
    //         this.user.removeFavorite(sessionData.name);
    //         this.updateSchedule();

    //         // close the sliding item and hide the option buttons
    //         slidingItem.close();
    //       }
    //     }
    //   ]
    // });
    // // now present the alert on top of all other content
    // alert.present();
  }

  doRefresh(refresher: Refresher) {
    // Validar se está funcionando depois de fazer o diff da lecture
    this.thfSync.sync().then(() => {
      refresher.complete();
    });
  }
}
