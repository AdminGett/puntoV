import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalCompComponent } from './components/modal-comp/modal-comp.component';
import { VentaProductoComponent } from './components/venta-producto/venta-producto.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomInputComponent,
    ModalCompComponent,
    VentaProductoComponent
  ],exports:[
    HeaderComponent,
    FooterComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    ModalCompComponent,
    VentaProductoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],

})
export class SharedModule { }
