import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';

import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ThfSyncService, ThfSyncConfig, ThfNetworkType } from '@totvs/thf-sync';
import { ThfStorageService } from '@totvs/thf-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from './../pages/home/home';
import { SpeakerListPage } from './../pages/speaker-list/speaker-list';
import { schemas } from './../schemas/schemas-list';
import { AboutPage } from '../pages/about/about';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  loginPage = { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' };

  @ViewChild(Nav) nav: Nav;

  appPages: Array<PageInterface> = [
    { title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, index: 0, icon: 'calendar' },
    { title: 'Speakers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
    { title: 'Notes', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 2, icon: 'paper' },
    { title: 'About conference', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private thfSync: ThfSyncService,
    private thfStorage: ThfStorageService,
    private menu: MenuController) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

    });

    this.menu.enable(true, 'menu');

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

  openPage(page: PageInterface) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      // this.userData.logout();
    }
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

}
