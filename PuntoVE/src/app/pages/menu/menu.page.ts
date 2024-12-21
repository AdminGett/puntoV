import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from '../../services/firebase.service';
import { orderBy, } from 'firebase/firestore';
import { Storage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getStorage, uploadBytesResumable, ref, uploadString } from 'firebase/storage';
import { Conditional } from '@angular/compiler';

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
  selectedIds: string[] = [];
  savedData = [];

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
    this.createProduct()
    // let datos = {
    //   codigo: this.form.value.codigo,
    //   nombre: this.form.value.nombre,
    //   categoria: this.form.value.categoria,
    //   cantidad: this.form.value.cantidad,
    //   precio: this.form.value.precio,
    //   prNeto: this.form.value.prNeto,
    //   image: this.form.value.img
    // }
    // console.log(datos)
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
    this.form.controls.img.setValue(dataUrl)
    
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
  deleteFoto(){
    // console.log("Eliminacion de Fotos: ",this.check)
  }

  async createProduct() {
    let path:string = 'datos'
    const loading = await this.utils.loading()
      await loading.present()

    let dataUrl:string = this.form.value.img
    const filePath:string =`images/${Date.now()}`
    // const fileRef = ref(getStorage(), path)
    // console.log(fileRef)
    let imageUrl = await this.fare.uploadImage(filePath, dataUrl)
    // let imageUrl = uploadBytesResumable(fileRef, dataUrl,filePath)z
    this.form.controls.img.setValue( imageUrl)

   
    

    // // === subir imagen =====
    // let dataUrl = this.form.value.img
    // let imagePath = `images/${Date.now()}`
    // console.log(path)
    // // let imageUrl = await this.fare.uploadImage(imagePath, dataUrl)
    // // this.form.controls.img.setValue(imageUrl)
    // console.log(imagePath)

    // // delete this.form.value.id

      // this.fare.addDocument(path, this.form.value).then(async res=>{
    this.fare.setMetadata( this.form.value).then(async res=>{

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

  // Sent datos de id's a eliminar de base de datos y fotos
  onCheckboxChange(codigo: string) {
    if (this.selectedIds.includes(codigo)) {
      this.selectedIds = this.selectedIds.filter(id => id !== codigo);
    } else {
      this.selectedIds.push(codigo);
    }
  }
  Upd_Info(){
   
    for (let index = 0; index < this.selectedIds.length; index++) {
      console.log(this.dataP)
      const dataPr = this.dataP.find(data => data.id ===this.selectedIds[index])
     if (dataPr) {
       this.savedData.push(dataPr); // Add the found data to the savedData array
      }
      console.log(this.savedData)
    }
  }

  ngOnDestroy() {
    // this.dataP
  }
}
