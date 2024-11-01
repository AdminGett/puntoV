import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage {
  tarjeta = {
    numero: '',
    expiracion: '',
    cvv: '',
    nombreTitular: ''
  };

  constructor(private alertController: AlertController) { }

  async finalizarCompra() {
    const alert = await this.alertController.create({
      header: 'Compra Finalizada',
      message: 'Tu producto ha sido añadido al carrito con éxito. Puedes proceder al pago.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async procesarPago() {
    if (this.validarTarjeta()) {
      const alert = await this.alertController.create({
        header: 'Pago Exitoso',
        message: 'Tu pago ha sido procesado exitosamente.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error en el Pago',
        message: 'Por favor, revisa los datos de tu tarjeta e intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  validarTarjeta() {
    const { numero, expiracion, cvv, nombreTitular } = this.tarjeta;
    return numero && expiracion && cvv && nombreTitular;
  }
}
