import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-venta-producto',
  templateUrl: './venta-producto.component.html',
  styleUrls: ['./venta-producto.component.scss'],
})
export class VentaProductoComponent  implements OnInit {
  binding!:string
  add!:boolean
  
  FirebaseStor = inject(FirebaseService)
  constructor() { }

  ngOnInit() {}
  
  Add(id){
    this.FirebaseStor.getProductoPorCodigo(id).subscribe((data: any) => {
      const dataP = data
      console.log(dataP)
    })
    this.add = true
    //console.log(base)
    this.binding=null
  }

}
