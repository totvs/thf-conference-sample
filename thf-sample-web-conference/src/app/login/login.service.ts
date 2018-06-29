import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GenericService } from './../generic/service/generic.service';
import { User } from '../model/user';

@Injectable()
export class LoginService extends GenericService<User> {

  constructor(http: HttpClient) {
    super(http, 'auth');
  }

  isLoggedIn(): string {
    return localStorage.getItem('isLoggedIn');
  }

}
