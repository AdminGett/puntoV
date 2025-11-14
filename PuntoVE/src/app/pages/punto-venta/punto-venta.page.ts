import { Component, OnInit, Type } from '@angular/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { VentaProductoComponent } from 'src/app/shared/components/venta-producto/venta-producto.component';
import { VentasRealizadasComponent } from 'src/app/shared/components/ventas-realizadas/ventas-realizadas.component';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.page.html',
  styleUrls: ['./punto-venta.page.scss'],
  standalone:false
})
export class PuntoVentaPage implements OnInit {
 currentComponent: Type<any> | null = VentaProductoComponent;
  constructor() { }

  ngOnInit() {
  }
  availableComponents = [
    {
      id: 'venta-producto',
      name: 'Nueva venta',
      icon: 'grid',
      component: VentaProductoComponent
    },
    {
      id: 'pies',
      name: 'Ventas realizadas',
      icon: 'list',
      component: VentasRealizadasComponent
    },
    {
      id: 'Factura',
      name: 'Factura',
      icon: 'document-text',
      //component: FooterComponent
    }
    // Agrega más componentes según necesites
  ];

  loadComponent(componentId: string) {
    const selected = this.availableComponents.find(c => c.id === componentId);
    if (selected) {
      this.currentComponent = selected.component;
    }
  }
}
