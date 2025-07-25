import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthUsersPageRoutingModule } from './auth-users-routing.module';

import { AuthUsersPage } from './auth-users.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthUsersPageRoutingModule,
    SharedModule,
  ],
  declarations: [AuthUsersPage]
})
export class AuthUsersPageModule {}
