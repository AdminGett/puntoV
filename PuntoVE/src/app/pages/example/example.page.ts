import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-example',
  templateUrl: './example.page.html',
  styleUrls: ['./example.page.scss'],
})
export class ExamplePage implements OnInit {

  cartItems: any[] = [
    {
      id: 1,
      name: 'Carriola',
      description: 'Carriola con pañalera incluida, estante de biberón, manubrios de goma para mejor comodidad, seguros en el manubrio y protector solar.',
      price: 1200,
      warranty: 'Garantía de 12 meses',
      imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg' 
    }
  ];

  deliveryOption: string = 'store';
  subtotal: number = 1200;
  total: number = 1200;
  item: any;

  constructor(private router: Router) { } // Inyectar Router

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price, 0);
    this.total = this.subtotal;
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.calculateTotal();
  }

  saveForLater(item: any) {
    console.log('Artículo guardado para después:', item);
  }

  onDeliveryOptionChange(event: any) {
    this.deliveryOption = event.detail.value;
    console.log('Opción de entrega seleccionada:', this.deliveryOption);
  }

  // Redirigir a la página de pago
  proceedToPayment() {
    console.log('Procesando pago...');
    console.log('Productos en el carrito:', this.cartItems);
    console.log('Opción de entrega seleccionada:', this.deliveryOption);
    console.log('Total a pagar:', this.total);

    // Aquí se redirige a la página de pago
    this.router.navigate(['/pago']);
  }
}
   