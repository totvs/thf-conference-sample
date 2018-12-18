import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfPageLogin } from '@totvs/thf-templates/components/thf-page-login';
import { ThfStorageService } from '@totvs/thf-storage';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hideRememberUser: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: ThfStorageService,
    private thfNotification: ThfNotificationService) { }

  loginSubmit(formData: ThfPageLogin) {
    const user = Object.assign({ username: formData.login, password: formData.password });

    this.loginService.postWithPath('login', user).subscribe(() => {
      this.storage.set('isLoggedIn', 'true').then(() => {
        this.router.navigate(['/home']);
      });
    }, () => {
      this.thfNotification.error('Invalid username or password. Please try again.');
    });

  }

}
