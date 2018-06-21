import { Injectable } from '@angular/core';
import { ThfStorageService } from '@totvs/thf-storage';

import { ThfEntity } from '@totvs/thf-sync/models';
import { ThfSyncService } from '@totvs/thf-sync';

@Injectable()
export class UserService {

  loggedUser;
  userModel: ThfEntity;
  users;

  constructor(private thfSync: ThfSyncService, private thfStorage: ThfStorageService) {
    this.userModel = this.thfSync.getModel('Users');
    this.getLoggedUser().then(user => this.loggedUser = user);
  }

  async addFavoriteLecture(lectureId) {
    const user = await this.userModel.findById(this.loggedUser).exec();
    user.favoriteLectures = user.favoriteLectures || [];

    if (!user.favoriteLectures.includes(lectureId)) {
      user.favoriteLectures.push(lectureId);

      await this.userModel.save(user);

    } else {
      throw new Error();
    }

  }

  async getFavoriteLectures() {
    const user = await this.userModel.findById(this.loggedUser).exec();
    return user.favoriteLectures;
  }

  async getLoggedUser() {
    const login = await this.thfStorage.get('login');
    return login ? login.userId : undefined;
  }

  getModel() {
    return this.userModel;
  }

  getUsers() {
    return this.userModel.find().exec().then(data => this.users = data.items);
  }

  async removeFavoriteLecture(lectureId) {
    const user = await this.userModel.findById(this.loggedUser).exec();

    user.favoriteLectures = user.favoriteLectures.filter(id => lectureId !== id);
    await this.userModel.save(user);

  }

  synchronize() {
    return this.thfSync.sync();
  }

}
