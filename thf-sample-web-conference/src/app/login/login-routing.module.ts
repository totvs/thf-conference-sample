import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThfPageLoginComponent } from '@totvs/thf-templates';

const loginRoutes: Routes = [
  {
    path: '',
    component: ThfPageLoginComponent,
    data: {
      serviceApi: 'http://localhost:8080/conference-api/api/v1/auth/login',
      environment: 'TESTE',
      recovery: {
        url: 'http://localhost:8080/conference-api/api/v1/auth/recovery',
        type: 'email',
        phoneMask: '(99) 99999-9999',
        contactMail: 'suporte@mail.com'
      },
      registerUrl: 'new-password'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
