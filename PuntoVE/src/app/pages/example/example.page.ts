import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.page.html',
  styleUrls: ['./example.page.scss'],
})
export class ExamplePage implements OnInit {

  // Carrito de productos, puedes llenarlo con productos de ejemplo
  cartItems: any[] = [
    {
      id: 1,
      name: 'Carriola',
      description: 'Carriola con pañalera incluida, estante de biberón, manubrios de goma para mejor comodidad, seguros en el manubrio y protector solar.',
      price: 1200,
      warranty: 'Garantía de 12 meses',
      imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg' // Reemplaza con la ruta real de la imagen
    }
  ];

  // Opción de entrega seleccionada (tienda o domicilio)
  deliveryOption: string = 'store'; // Valor por defecto 'store' para entrega en tienda gratis

  // Subtotales y totales (calcular el subtotal sumando el precio de los productos del carrito)
  subtotal: number = 1200;
  total: number = 1200;
item: any;

  constructor() { }

  ngOnInit() {
    // Se podría calcular el total de todos los productos al iniciar la página
    this.calculateTotal();
  }

  // Función para calcular el subtotal y total (aquí solo sumamos los precios)
  calculateTotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price, 0);
    this.total = this.subtotal; // Si necesitas incluir otros cargos, se pueden sumar aquí
  }

  // Eliminar un artículo del carrito
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.calculateTotal(); // Recalcular el total después de eliminar
  }

  // Guardar el artículo para después (aquí se podría agregar lógica para guardarlo en otro lugar)
  saveForLater(item: any) {
    console.log('Artículo guardado para después:', item);
  }

  // Cambiar la opción de entrega y actualizar según corresponda
  onDeliveryOptionChange(event: any) {
    this.deliveryOption = event.detail.value;
    console.log('Opción de entrega seleccionada:', this.deliveryOption);
  }

  // Acción para realizar el pago (aquí podrías integrar una pasarela de pago)
  proceedToPayment() {
    console.log('Procesando pago...');
    console.log('Productos en el carrito:', this.cartItems);
    console.log('Opción de entrega seleccionada:', this.deliveryOption);
    console.log('Total a pagar:', this.total);
  }
}
