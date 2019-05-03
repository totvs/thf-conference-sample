import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ThfPageLoginModule } from '@totvs/thf-templates/components/thf-page-login';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    ThfPageLoginModule
  ],
  declarations: [
  ],
  providers: []
})
export class LoginModule { }
