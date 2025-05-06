import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);

  // ==================== Cámara ====================
  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });
  }

  // ==================== UI ====================
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ==================== Navegación ====================
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // ==================== Local Storage ====================
  savelocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  // ==================== Modales ====================
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }

  dimissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  // ==================== PDF y Compartir ====================
  async generateAndSharePdf() {
    try {
      const text = 'Contenido del PDF generado';
      const fileName = `documento-${new Date().getTime()}.pdf`;
      
      if (this.isMobile()) {
        const base64Data = btoa(text);
        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache,
          encoding: Encoding.UTF8
        });
        
        await Share.share({
          title: 'Compartir PDF',
          url: result.uri
        });
      } else { 
        const blob = new Blob([text], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      }
    } catch (error) {
      console.error('Error al generar PDF:', error);
      throw error;
    }
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}