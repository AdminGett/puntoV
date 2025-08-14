import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { retry } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  [x: string]: any;
  datos: any[] = []
 //Se crean el servicio de utils para ser mas r apida la respuesta en el proyecto al logearse
 loadingCtrl = inject(LoadingController)
 toastCtrl = inject(ToastController)
 router = inject(Router)
 modalCtrl = inject(ModalController)
 alertCtrl = inject(AlertController)
 
 constructor(){
  (pdfMake as any).vfs = pdfFonts; 
 }
 
 async takePicture(promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Toma una forto'
  });
};


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
  async generateAndSharePdf() {
    // Definir el documento
    const docDefinition:any = {
      content: [
        { text: 'Título del documento', style: 'header' },
        { text: 'Contenido del PDF generado desde Ionic', margin: [0, 20, 0, 0] },
        // Puedes personalizar mucho más el contenido aquí
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color:'red'
        }
      }
    };

    // Generar PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);
    
    // Opción 1: Abrir en nueva ventana (para web)
    // pdfDoc.open();
    
    // Opción 2: Descargar o compartir en móvil
    // pdfDoc.getBuffer(async (buffer) => {
    //   const blob = new Blob([buffer], { type: 'application/pdf' });
      
    //   // Guardar el archivo
    //   const fileName = `documento-${new Date().getTime()}.pdf`;
      
    //   if (this.isMobile()) {
    //     console.log('01 descarga ')
    //     // Para dispositivos móviles
    //     const base64Data = await this.blobToBase64(blob);
        
    //     // Guardar usando Filesystem API
    //     const result = await Filesystem.writeFile({
    //       path: fileName,
    //       data: base64Data,
    //       directory: Directory.Cache,
    //     });
        
    //     // Compartir el archivo
    //     await Share.share({
    //       title: 'Compartir PDF',
    //       url: result.uri,
    //       dialogTitle: 'Compartir documento PDF'
    //     });
    //   } else {
    //     console.log('02 descarga ')
    //     // Para navegador
    //     const link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = fileName;
    //     link.click();
    //   }
    // });
    
  }

  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

}
