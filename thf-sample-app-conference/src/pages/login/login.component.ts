import { Component } from '@angular/core';

import { Events, NavController, ToastController } from 'ionic-angular';

import { ThfPageLogin } from '@totvs/thf-templates/components/thf-page-login';

import { SignupPage } from '../signup/signup.component';
import { TabsPage } from '../tabs/tabs.component';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'login.component.html'
})
export class LoginPage {

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private userService: UserService,
  ) { }

  onLogin(form: ThfPageLogin) {
    this.userService.onLogin(form.login, form.password)
      .then(() => {
        this.events.publish('user:login');
        this.navCtrl.push(TabsPage);
      })
      .catch(() => this.createToast());

  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  private createToast() {
    const toast = this.toastCtrl.create({
      message: 'User or password are incorrect',
      duration: 3000,
      position: 'top',
      cssClass: 'toaster'
    });
    toast.present();
  }

}
