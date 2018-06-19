import { ThfStorageService } from '@totvs/thf-storage';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, Events } from 'ionic-angular';

import { ThfSyncService, ThfHttpRequestData, ThfHttpRequestType } from '@totvs/thf-sync';

import { TabsPage } from '../tabs/tabs';

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
    private thfSync: ThfSyncService,
    private thfStorage: ThfStorageService) {
    this.httpCommandEvents();
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      const requestData: ThfHttpRequestData = {
        url: 'http://localhost:8080/conference-api/api/v1/users/',
        method: ThfHttpRequestType.POST,
        body: this.signup
      };

      this.thfSync.insertHttpCommand(requestData, this.signup.username).then(() => {});

      this.navCtrl.push(TabsPage);
    }
  }

  httpCommandEvents() {
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
