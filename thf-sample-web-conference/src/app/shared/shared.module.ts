import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';
import { ThfStorageModule } from '@totvs/thf-storage';
import { ThfTemplatesModule } from '@totvs/thf-templates';

import { AuthGuardService } from '../auth/auth-guard.service';
import { GenericService } from './../generic/service/generic.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ThfModule,
    ThfStorageModule.forRoot({
      name: 'appconference',
      storeName: 'mystore',
      driverOrder: ['localstorage']
    })
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ThfModule,
    ThfStorageModule,
    ThfTemplatesModule
  ],
  providers: [
    AuthGuardService,
    GenericService
  ]
})
export class SharedModule { }
