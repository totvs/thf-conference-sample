import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ThfSyncService, ThfSyncConfig, ThfNetworkType } from '@totvs/thf-sync';
import { ThfStorageService } from '@totvs/thf-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { schemas } from './../schemas/schemas-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private thfSync: ThfSyncService, private thfStorage: ThfStorageService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

    });

    this.initSync();
  }

  initSync() {
    const config: ThfSyncConfig = {
      type: ThfNetworkType.ethernet,
      period: 10
    };

    this.thfSync.prepare(schemas, config).then(() => this.initialDataLoad());
  }

  initialDataLoad() {
    this.thfStorage.get('firstLoad').then(firstLoad => {

      if(!firstLoad) {
        this.thfStorage.set('firstLoad', true).then(() => {
          this.thfSync.loadData().subscribe(() => console.log('Initial data load!'));
        });
      }

    });
  }

}
