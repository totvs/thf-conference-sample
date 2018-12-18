import { Component } from '@angular/core';

import { Events, NavController } from 'ionic-angular';

import { ThfPageLogin, ThfPageLoginLiterals } from '@totvs/thf-templates/components/thf-page-login';
import { ThfStorageService } from '@totvs/thf-storage';
import { ThfSyncService } from '@totvs/thf-sync';

import { TabsPage } from '../tabs/tabs.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.component.html'
})
export class SignupPage {

  customLiterals: ThfPageLoginLiterals = {
    submitLabel: 'Create account'
  };

  customRequestId;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    private thfStorage: ThfStorageService,
    private thfSync: ThfSyncService,
    private userService: UserService) {
    this.httpCommandEvents();
  }

  onSignup(form: ThfPageLogin) {
    const newUser = { username: form.login, password: form.password };
    this.customRequestId = newUser.username;

    this.userService.createUser(newUser);
    this.navCtrl.push(TabsPage);
  }

  private httpCommandEvents() {
    this.thfSync.getResponses().subscribe(thfSyncResponse => {

      if (thfSyncResponse.customRequestId === this.customRequestId) {
        const userId = thfSyncResponse.response['body'].id;

        this.thfStorage.set('login', { userId }).then(() => {
          this.events.publish('user:login');
          this.navCtrl.push(TabsPage);
        });

      }
    });
  }

}
