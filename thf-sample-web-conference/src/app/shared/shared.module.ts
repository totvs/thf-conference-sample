import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';

import { AuthGuardService } from '../auth/auth-guard.service';
import { GenericService } from './../generic/service/generic.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ThfModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,

    ThfModule
  ],
  providers: [
    AuthGuardService,
    GenericService
  ]
})
export class SharedModule { }
