import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntoVentaPageRoutingModule } from './punto-venta-routing.module';

import { PuntoVentaPage } from './punto-venta.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntoVentaPageRoutingModule,
    SharedModule,
  ],
  declarations: [PuntoVentaPage]
})
export class PuntoVentaPageModule {}
