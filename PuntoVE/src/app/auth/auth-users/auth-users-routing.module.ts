import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthUsersPage } from './auth-users.page';

const routes: Routes = [
  {
    path: '',
    component: AuthUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthUsersPageRoutingModule {}
