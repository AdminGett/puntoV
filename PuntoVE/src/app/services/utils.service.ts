import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { retry } from 'rxjs';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  [x: string]: any;
  datos: any[] = []
 //Se crean el servicio de utils para ser mas rapida la respuesta en el proyecto al logearse
 loadingCtrl = inject(LoadingController)
 toastCtrl = inject(ToastController)
 router = inject(Router)
 modalCtrl = inject(ModalController)
 alertCtrl = inject(AlertController)
  // async takePicture(promptLabelHeader: string) {
  //   return await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Prompt,
  //     promptLabelHeader,
  //     promptLabelPhoto: 'Selecciona una imagen',
  //     promptLabelPicture: 'Toma una forto'
  //   });


  // };
  //=============== Alert ==========

  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  //=============== Loading ==========
  loading() {
    return this.loadingCtrl.create({
      spinner: 'crescent'
    })
  }
  //========= Toast ============== 
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  //======= rutas ========= 
  routerLink(url: string) {
    console.log(url)
    return this.router.navigateByUrl(url)
  }
  //======= Guarda un elemento en el local storage ========= 
  savelocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  //======= optener elemento del local storage ========= 
  // getFormLocalStorage(key: string) {
  //   return JSON.parse(localStorage.getItem(key))
  // }

  // =========Modal ============
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss()
    if (data) return data
  }

  dimissModal(data?: any) {
    return this.modalCtrl.dismiss(data)
  }
}
