import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Events, NavController } from 'ionic-angular';

import { ThfStorageService } from '@totvs/thf-storage';
import { ThfSyncService } from '@totvs/thf-sync';

import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signup = { username: '', password: '', isSuperUser: false };
  submitted = false;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    private thfStorage: ThfStorageService,
    private thfSync: ThfSyncService,
    private userService: UserService) {
    this.httpCommandEvents();
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userService.createUser(this.signup);
      this.navCtrl.push(TabsPage);
    }
  }

  private httpCommandEvents() {
    this.thfSync.getHttpResponses().subscribe(thfHttpClientResponse => {

      if (thfHttpClientResponse.customRequestId === this.signup.username) {
        const userId = thfHttpClientResponse.response['body'].id;

        this.thfStorage.set('login', { userId }).then(() => {
          this.events.publish('user:login');
          this.navCtrl.push(TabsPage);
        });

      }
    });
  }

}
