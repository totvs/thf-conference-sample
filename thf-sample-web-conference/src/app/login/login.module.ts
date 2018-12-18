import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';
import { SharedModule } from './../shared/shared.module';
import { ThfPageLoginModule } from '@totvs/thf-templates/components/thf-page-login';

@NgModule({
  imports: [
    SharedModule,

    LoginRoutingModule,
    ThfPageLoginModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
