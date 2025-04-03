import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanlelControllAdminPageRoutingModule } from './panlel-controll-admin-routing.module';

import { PanlelControllAdminPage } from './panlel-controll-admin.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanlelControllAdminPageRoutingModule,
    SharedModule,
    NgApexchartsModule,
  ],
  declarations: [PanlelControllAdminPage]
})
export class PanlelControllAdminPageModule {}
