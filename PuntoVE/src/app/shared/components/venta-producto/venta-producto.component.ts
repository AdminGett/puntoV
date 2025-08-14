import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from '../../../services/utils.service';

interface ProductoEnCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria:string;
}

@Component({
  selector: 'app-venta-producto',
  templateUrl: './venta-producto.component.html',
  styleUrls: ['./venta-producto.component.scss'],
})
export class VentaProductoComponent  implements OnInit {
  binding!:string
  add!:boolean
  Productos:any[]=[]
  cantidad:number = 0
  Total:number = 0
  Utils=inject(UtilsService)
  FirebaseStor = inject(FirebaseService)
  constructor() { }

  ngOnInit() {}
  
  Add(id:string) {
    this.FirebaseStor.getProductoPorCodigo(id).subscribe((data: any) => {
      // Busca el producto en el carrito
      if(data != null){
              const productoExistente = this.Productos.find(p => p.id === data.id);
          console.log(data)
          // Si el producto ya está en el carrito, incrementa la cantidad
          if (productoExistente) {
            console.log(1)
            productoExistente.cantidad++;
            this.Total += +productoExistente.precio; 
          } else {
            // Si el producto no está en el carrito, lo agrega
            const nuevoProducto: ProductoEnCarrito = {
              id: data.id,
              categoria:data.categoria,
              nombre: data.nombre,
              precio: data.prNeto,
              cantidad: 1
            };
            this.Total += +nuevoProducto.precio; //se coloca el simbolo (+) para parcear lo que recive de firebase 
            this.Productos.push(nuevoProducto);
          }
          this.add = true
      }else{
        console.log('Error')
        this.alerte()
      }
    
    });
  }
  async alerte(){
    this.Utils.presentAlert({
      header: 'Elemento no Existente!',
      message: 'Buscar otro producto!',
      mode:'ios',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'cancel-button'
        }, {
          text: 'Aceptar',
          handler: () => {
            // this.delateProduct(producto)
          }
        }
      ]
    });
  }
  

}
