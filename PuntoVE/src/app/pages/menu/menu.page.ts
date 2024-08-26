import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from '../../services/firebase.service';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  page:number =1
  noOfRows:number = 10
  form = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    cantidad: new FormControl(0, [Validators.required]),
    precio: new FormControl(0, [Validators.required]),
    prNeto: new FormControl(0, [Validators.required]),
  })
  utils = inject(UtilsService)
  fare = inject(FirebaseService)

  ngOnInit() {
  }
  agregar(){
    // this.utils.datos={
    //   codigo: this.form.value.codigo
    // }
    this.utils.datos.push(this.form.value)
    let path = `tiendas/tienda1/productos`
    console.log(this.utils.datos)
  }
  getProduct() {
    console.log(10)
  let path = 'tiendas/tienda1/Productos'
    let query = [
      orderBy('soldUnits', 'desc'), 
      // where('soldUnits','>',30)
    ]
   

    let sub = this.fare.getCollection(path, query).subscribe({
      next: (res: any) => {
        console.log(res)
        sub.unsubscribe()
      }
    })

  }
  print() {
    window.print();
  }
}
