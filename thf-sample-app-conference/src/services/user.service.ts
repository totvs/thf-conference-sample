import { Injectable } from '@angular/core';

import { ThfEntity } from '@totvs/thf-sync/models';
import { ThfStorageService } from '@totvs/thf-storage';
import { ThfSyncService, ThfHttpRequestData, ThfHttpRequestType } from '@totvs/thf-sync';

@Injectable()
export class UserService {

  userModel: ThfEntity;

  constructor(private thfSync: ThfSyncService, private thfStorage: ThfStorageService) {
    this.userModel = this.thfSync.getModel('Users');
  }

  async addFavoriteLecture(lectureId, loggedUser) {
    const user: any = await this.userModel.findById(loggedUser).exec();
    user.favoriteLectures = user.favoriteLectures || [];

    if (!user.favoriteLectures.includes(lectureId)) {
      user.favoriteLectures.push(lectureId);

      await this.userModel.save(user);

    } else {
      throw new Error();
    }

  }

  async addFavoriteLectureList(lecturesId) {
    const loggedUser = await this.getLoggedUserId();

    if (!(lecturesId instanceof Array)) {
      lecturesId = [lecturesId];
    }

    for (const lectureId of lecturesId) {
      await this.addFavoriteLecture(lectureId, loggedUser);
    }

  }

  createUser(user) {
    user.isSuperUser = false;

    const requestData: ThfHttpRequestData = {
      url: 'http://localhost:8080/conference-api/api/v1/users/',
      method: ThfHttpRequestType.POST,
      body: user
    };

    this.thfSync.insertHttpCommand(requestData, user.username);
  }

  async getFavoriteLectures() {
    const loggedUser = await this.getLoggedUserId();
    const user: any = await this.userModel.findById(loggedUser).exec();
    return 'favoriteLectures' in user ? user.favoriteLectures : undefined;
  }

  async getLoggedUserId() {
    const login = await this.thfStorage.get('login');
    return login ? login.userId : undefined;
  }

  getModel() {
    return this.userModel;
  }

  async getLoggedUser() {
    const userid = await this.getLoggedUserId();

    return this.userModel.findById(userid).exec();
  }

  async getUsers() {
    const userData: any = await this.userModel.find().exec();
    return userData.items;
  }

  async onLogin(username, password) {
    const users: any = await this.getUsers();

    const foundUser = users.find(user => {
      return (user.username === username) && (user.password === password);
    });

    return foundUser ? this.logIn(foundUser) : Promise.reject('User not found');
  }

  async removeFavoriteLecture(lectureId) {
    const loggedUser = await this.getLoggedUserId();
    const user: any = await this.userModel.findById(loggedUser).exec();

    user.favoriteLectures = user.favoriteLectures.filter(id => lectureId !== id);
    await this.userModel.save(user);

  }

  synchronize() {
    return this.thfSync.sync();
  }

  private logIn(foundUser) {
    return this.thfStorage.set('login', { userId: foundUser.id });
  }

}
