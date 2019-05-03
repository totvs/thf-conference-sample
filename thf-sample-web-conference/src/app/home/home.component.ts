import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ThfStorageService } from '@totvs/thf-storage';

import { ThfMenuItem } from '@totvs/thf-ui/components/thf-menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  menus: Array<ThfMenuItem> = [
    { label: 'Home', icon: 'home', link: '/home' },
    { label: 'Speakers', icon: 'user', link: '/speakers' },
    { label: 'Lectures', icon: 'message', link: '/lectures' },
    { label: 'Tracks', icon: 'stock', link: '/tracks' },
    { label: 'About', icon: 'help', link: '/conferences' },
    { label: 'Logout', icon: 'exit', action: this.logout.bind(this) }
  ];
  title = 'THF Conference App';

  constructor(private router: Router, private storage: ThfStorageService) { }

  logout(): void {
    sessionStorage.removeItem('THF_USER_LOGIN');
    this.router.navigate(['/login']);
  }

}
