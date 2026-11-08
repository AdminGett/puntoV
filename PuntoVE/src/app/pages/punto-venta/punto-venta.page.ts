import { Component, OnInit, Type, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CancelacionComponent } from 'src/app/shared/components/cancelacion/cancelacion.component';
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
 router = inject(Router)
 NombreUsuario:string = 'Administrador'
 coloborador:string = '0'
 Pruesto:string = ''
 selectedComponentId: string | null = null;
 
  constructor() {
   }

  ngOnInit() {
   
    if(sessionStorage.getItem('existe')){
        this.NombreUsuario = sessionStorage.getItem('existe')
        this.coloborador = sessionStorage.getItem('Id')
        this.Pruesto = sessionStorage.getItem('Area')
    }
    this.loadSavedSelection();
  }
 
  availableComponents = [
    {
      id: 'venta-producto',
      name: 'Nueva venta',
      icon: 'grid',
      component: VentaProductoComponent
    },
    {
      id: 'cancelacion',
      name: 'Cancelar ticket',
      icon: 'ban',
      component: CancelacionComponent
    },
    {
      id: '#',
      name: 'Devoluciones',
      icon: 'reload-circle',
      //component: VentasRealizadasComponent
    },
    {
      id: '#',
      name: 'Reimprimir ticket',
      icon: 'print',
      //component: VentasRealizadasComponent
    },
     {
      id: 'pies',
      name: 'Ventas realizadas',
      icon: 'bag-check',
      component: VentasRealizadasComponent
    },

      // {
      //   id: 'Factura',
      //   name: 'Factura',
      //   icon: 'document-text',
      //   //component: FooterComponent
      // },
    {
      name: 'Inventario',
      icon: 'list',
      RouterLink: '/menu'
      //component: FooterComponent
    },
     {
      name: 'Ajustes',
      icon: 'settings',
      RouterLink: '/panlel-controll-admin'
      //component: FooterComponent
    }
    // Agrega más componentes según necesites
  ];

  loadComponent(componentId: string) {
    /*const selected = this.availableComponents.find(c => c.id === componentId);
    console.log(selected)
    this.selectedComponentId = componentId;
    localStorage.setItem('selectedComponent', componentId);
    if (selected.id) {
      this.currentComponent = selected.component;
    }else {
      console.log(1)
      this.router.navigate([selected.RouterLink]);  
    }*/
    const selected = this.availableComponents.find(c => c.id === componentId);
    console.log('Componente seleccionado:', selected);
    
    if (!selected) {
      console.log('Componente no encontrado');
      return;
    }

    this.selectedComponentId = componentId;
    localStorage.setItem('selectedComponent', componentId);
    
    // Verificar si tiene component o RouterLink
    if (selected.component) {
      // Es un componente para cargar en la misma vista
      this.currentComponent = selected.component;
      console.log('Cargando componente:', selected.component);
    } else if (selected.RouterLink) {
      // Es una ruta para navegar
      console.log('Navegando a:', selected.RouterLink);
      this.router.navigate([selected.RouterLink]);
    } else {
      console.log('No hay component ni RouterLink definido');
    }
  }
  loadSavedSelection() {
    const savedId = localStorage.getItem('selectedComponent');
    if (savedId) {
      const savedComponent = this.availableComponents.find(c => c.id === savedId);
      if (savedComponent) {
        this.selectedComponentId = savedId;
        // Restaurar el componente o navegar según el tipo
        if (savedComponent.component) {
          this.currentComponent = savedComponent.component;
        } else if (savedComponent.RouterLink) {
          this.router.navigate([savedComponent.RouterLink]);
        }
      }
    }
  }
  
}
