import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatalogPageRoutingModule } from './catalog-routing.module';
import { CatalogPage } from './catalog.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogPageRoutingModule,
    SharedModule,
  ],
  declarations: [CatalogPage]
})
export class CatalogPageModule {}
