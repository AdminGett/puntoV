import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanlelControllAdminPage } from './panlel-controll-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PanlelControllAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanlelControllAdminPageRoutingModule {}
