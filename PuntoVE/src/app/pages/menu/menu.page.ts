import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from '../../services/firebase.service';
import { orderBy } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  page:number =1
  noOfRows:number = 10
  selectedFile: File;
  imageUrl: string;
  dataP: any[]

  form = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    prNeto: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  })
  utils = inject(UtilsService)
  fare = inject(FirebaseService)

  ngOnInit() {
    this.fare.getMetadata().subscribe((data:any)=>{
       this.dataP = data
       console.log(this.dataP) 
    })
  }

  agregar(){
    let datos = {
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
      categoria:this.form.value.categoria,
      cantida: this.form.value.cantidad,
      precio: this.form.value.precio,
      prNEto: this.form.value.prNeto,
      image: this.form.value.img
    }
    console.log(datos)
    this.fare.setMetadata(datos)
    // this.utils.datos.push(this.form.value)
    // let path = `tiendas/tienda1/productos`
    // console.log(this.utils.datos)
  }
  getProduct() {
  //  this.fare.setMetadata()
   let info = this.fare.getMetadata().subscribe({
      next: (res: any) => {
        console.log(res)
        info.unsubscribe()
      }
    })

  let path = 'tiendas/tienda1/Productos'
    let query = [
      orderBy('soldUnits', 'desc'), 
      // where('soldUnits','>',30)
    ]
   

    // let sub = this.fare.getCollection(path, query).subscribe({
    //   next: (res: any) => {
    //     console.log(res)
    //     sub.unsubscribe()
    //   }
    // })

  }
  chooseFile(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
     
      reader.onload = (e) => {
        // this.imageUrl = reader.result as string;
       this.form.value.img = reader.result as string;
       this.saveImageToServer(this.selectedFile);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      // Handle non-image files (e.g., CSV)
      console.log('Non-image file selected');
    }
  }
  print() {
    window.print();
  }

  private saveImageToServer(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    // Make a POST request to your server-side endpoint to handle image upload
    fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful image upload response (e.g., display success message)
        console.log('Image uploaded successfully:', data);
      })
      .catch(error => {
        // Handle image upload errors (e.g., display error message)
        console.error('Error uploading image:', error);
      });
  }
  ngOnDestroy(){
    // this.dataP
  }
}
