import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';
import { SharedModule } from './../shared/shared.module';
import { ThfPageLoginModule } from '@totvs/thf-templates/components/thf-page-login';
import { ThfPageBlockedUserModule, ThfPageChangePasswordModule, ThfModalPasswordRecoveryModule } from '@totvs/thf-templates';

@NgModule({
  imports: [
    SharedModule,

    LoginRoutingModule,
    ThfPageLoginModule,
    ThfPageBlockedUserModule,
    ThfPageChangePasswordModule,
    ThfModalPasswordRecoveryModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
