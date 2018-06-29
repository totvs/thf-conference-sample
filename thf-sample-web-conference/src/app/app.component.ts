import { Component } from '@angular/core';

import { ThfMenuItem } from '@totvs/thf-ui/components/thf-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'THF Conference App';

  menus: Array<ThfMenuItem> = [
    { label: 'Home', icon: 'home', link: './home' },
    { label: 'Speakers', icon: 'user', link: './speakers' },
    { label: 'Lectures', icon: 'message', link: './lectures' },
    { label: 'Tracks', icon: 'stock', link: './tracks' },
    { label: 'About', icon: 'help', link: './conferences' }
  ];

}
