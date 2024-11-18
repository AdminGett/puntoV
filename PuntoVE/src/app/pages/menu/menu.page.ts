import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from '../../services/firebase.service';
import { orderBy } from 'firebase/firestore';
import { ref, Storage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  page: number = 1
  noOfRows: number = 10
  selectedFile: File;
  imageUrl: string;
  dataP: any[]
  path!:File


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
  http = inject(HttpClient)
  

  ngOnInit() {
    this.fare.getMetadata().subscribe((data: any) => {
      this.dataP = data
      console.log(this.dataP)
    })
  }

  agregar() {
    let datos = {
      codigo: this.form.value.codigo,
      nombre: this.form.value.nombre,
      categoria: this.form.value.categoria,
      cantida: this.form.value.cantidad,
      precio: this.form.value.precio,
      prNEto: this.form.value.prNeto,
      image: this.form.value.img
    }
    console.log(datos)
    // this.fare.setMetadata(datos)
    // this.createProduct()
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
  async takeImage(event:any) {
    // this.path = event.target.files[0]
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const dataUrl = e.target.result;
    //   // Aquí puedes utilizar el dataUrl para mostrar una previsualización, subir el archivo, etc.
    //   console.log(dataUrl);
    //   this.form.controls.img.setValue(dataUrl)
    //   this.createProduct(this.path)
    // };
    // reader.readAsDataURL(this.path);
    
     const dataUrl = (await this.utils.takePicture('Imagen del producto')).dataUrl;
     console.log(dataUrl);
    this.form.controls.img.setValue(dataUrl)
    this.createProduct()
  }
  chooseFile(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = reader.result as string;
        this.form.value.img = reader.result as string;
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
  async createProduct() {
    let path = 'datos'
    const loading = await this.utils.loading()
      await loading.present()

    let dataUrl = this.form.value.img
    const filePath =`Images/${Date.now()}`
    console.log(filePath)
    // const fileRef = ref(this.storage,filePath)
    let imageUrl = await this.fare.uploadImage(filePath,dataUrl)
    console.log(imageUrl)
    this.form.controls.img.setValue(imageUrl)

   
    

    // // === subir imagen =====
    // let dataUrl = this.form.value.img
    // let imagePath = `images/${Date.now()}`
    // console.log(path)
    // // let imageUrl = await this.fare.uploadImage(imagePath, dataUrl)
    // // this.form.controls.img.setValue(imageUrl)
    // console.log(imagePath)

    // // delete this.form.value.id

    this.fare.addDocument(path, this.form.value).then(async res=>{

      this.fare.dimissModal({ success:true })

      this.utils.presentToast({
        message: 'Producto creado exitosamente',
        duration: 1500,
        color: 'success',
        position:'middle',
        icon: 'checkmark-circle'
      })

    }).catch(error=>{
      console.log(error)
      this.utils.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position:'middle',
        icon: 'alert-circle'
      })
    }).finally(()=>{
      loading.dismiss()
    })
  }


  ngOnDestroy() {
    // this.dataP
  }
}
