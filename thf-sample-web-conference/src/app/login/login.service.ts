import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ThfStorageService } from '@totvs/thf-storage';

import { GenericService } from './../generic/service/generic.service';
import { User } from '../model/user';

@Injectable()
export class LoginService extends GenericService<User> {

  path = 'auth';

  constructor(http: HttpClient, private storage: ThfStorageService) {
    super(http);
  }

  isLoggedIn(): Promise<any> {
    return this.storage.get('isLoggedIn');
  }

}
