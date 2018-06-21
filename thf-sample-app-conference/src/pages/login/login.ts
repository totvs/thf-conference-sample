import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Events, NavController, ToastController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  providers: [ UserService ]
})
export class LoginPage {

  login = { username: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public toastCtrl: ToastController,
    private userService: UserService,
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      this.userService.onLogin(this.login.username, this.login.password)
        .then(() => {
          this.events.publish('user:login');
          this.navCtrl.push(TabsPage);
        })
        .catch(() => this.createToast());

    }
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
