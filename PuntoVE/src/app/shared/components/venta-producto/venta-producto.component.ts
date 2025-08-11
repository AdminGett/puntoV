import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

interface ProductoEnCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
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
  
  FirebaseStor = inject(FirebaseService)
  constructor() { }

  ngOnInit() {}
  
  Add(id:string) {
    this.FirebaseStor.getProductoPorCodigo(id).subscribe((data: any) => {
      // Busca el producto en el carrito
      const productoExistente = this.Productos.find(p => p.id === data.id);
      console.log(data)
      // Si el producto ya está en el carrito, incrementa la cantidad
      if (productoExistente) {
        console.log(1)
        productoExistente.cantidad++;
      } else {
        // Si el producto no está en el carrito, lo agrega
        const nuevoProducto: ProductoEnCarrito = {
          id: data.id,
          nombre: data.nombre,
          precio: data.prNeto,
          cantidad: 1
        };
         console.log(2)
        this.Productos.push(nuevoProducto);
      }
    });
  }

}
