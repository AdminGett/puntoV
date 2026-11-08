import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { ModalController } from '@ionic/angular';

interface ProductoEnCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria:string;
  codigo:String;
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
  modal = inject(ModalController)
  utils = inject(UtilsService)
  fire = inject(FirebaseService)
  STOCK!:boolean 
  Folio:string = 'F001'
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
            productoExistente.cantidad++;
            this.Total += +productoExistente.precio; 
          } else {
            // Si el producto no está en el carrito, lo agrega
            const nuevoProducto: ProductoEnCarrito = {
              id: data.id,
              categoria:data.categoria,
              nombre: data.nombre,
              precio: data.prNeto,
              cantidad: 1,
              codigo:data.codigo,
            };
            this.Total += +nuevoProducto.precio; //se coloca el simbolo (+) para parcear lo que recive de firebase 
            this.Productos.push(nuevoProducto);
            console.log(this.Productos)
          }
          this.add = true
      }else{
        console.log('Error')
        this.alerte()
      }
    
    });
  }
  rest(id:number){//se resta la cantidad del producto con permisos del Administrador
    if(this.Productos[id]['cantidad']>='2'){
      this.Productos[id]['cantidad']-- 
      this.Total = this.Total - this.Productos[id]['precio']
    }else{
      this.Utils.presentAlert({
      header: 'Alerta',
      message: 'Agrega mas producto para poder hacer esta funcion',
      mode:'ios',
      cssClass: 'custom-alert',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            // this.delateProduct(producto)
          }
        }
      ]
    });
    }
  }
  deleatePro(id:number,codigo:string){
     console.log(id+''+codigo)
    const producto = this.Productos.find(p => p.codigo === codigo)
    console.log(producto)
    if (this.Productos.length<1) {
      this.Total -= (+producto.precio)*producto.cantidad
      console.log('1')
    }else{
      this.Total -= (+producto.precio)*producto.cantidad
      console.log(this.Total+' '+'2' +' '+(+producto.precio) +' '+producto.cantidad)
    }
    this.Productos.splice(id, 1);  
  }
  async alerte(){
    this.Utils.presentAlert({
      header: 'Producto no Existente!',
      message: 'No se encuentra registro de este producto!',
      mode:'ios',
      cssClass: 'custom-alert',
      buttons: [
         {
          text: 'Aceptar',
          handler: () => {
            // this.delateProduct(producto)
          }
        }
      ]
    });
  }
  
  async Venta(){
    //const Folio = 'F001'
    if(localStorage.getItem('F')!== 'F001'){
      const Folio = localStorage.getItem('F') 
      if (Folio) {
        var prefix = Folio.substring(0, 5);
      }
      const numberPart = Folio.substring(1);
    const nextNumber = parseInt(numberPart, 10) + 1;  
    const newNumberPart = nextNumber.toString().padStart(numberPart.length, '0');
    const nuevoCodigo = prefix + newNumberPart;
    console.log(nuevoCodigo)
    localStorage.setItem('F',nuevoCodigo)
    this.Folio  = localStorage.getItem('F')
    }else{
       const Folio = localStorage.getItem('F') 
      const prefix = Folio.substring(0, 1);
      const numberPart = Folio.substring(1);
    const nextNumber = parseInt(numberPart, 10) + 1;  
    const newNumberPart = nextNumber.toString().padStart(numberPart.length, '0');
    const nuevoCodigo = prefix + newNumberPart;
    console.log(nuevoCodigo)
    localStorage.setItem('F',nuevoCodigo)
    this.Folio  = localStorage.getItem('F')
    }

    if(this.Productos?.length > 0){
        const ventas = {
        Folio:this.Folio,
        venta:this.Productos,
        IdUsuario: sessionStorage.getItem('Id'),
        fecha: new Date().toLocaleDateString('es-MX')
      } 
      const loading = await this.utils.loading()
        await loading.present() 

      this.STOCK = this.fire.decontarproducto(this.Productos)
      console.log(this.STOCK)
      if(this.STOCK === true ){
        this.fire.addVenta(ventas)
      }else{
        this.Utils.presentAlert({
      header: 'Alerta',
      message: 'Ya no cuentas con producto en STOCK',
      mode:'ios',
      cssClass: 'custom-alert',
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            // this.delateProduct(producto)
          }
        }
      ]
    });
      }
      
      
      
      this.Productos = []
      this.modal.dismiss()
      loading.dismiss()
      this.Total=0
   
    } else {
      console.log('mensaje')
    }
  }
}
