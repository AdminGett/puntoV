import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importamos Router para la navegación

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  filter: string = 'all';
  searchQuery: string = '';
  products: any[] = [];

  constructor(
    private alertController: AlertController,  // Controlador para alertas
    private router: Router                     // Inyectamos el Router para navegación
  ) {}

  ngOnInit() {
    this.loadProducts();  // Cargamos los productos al iniciar la página
  }

  // Carga de productos (con los productos que me diste)
  loadProducts() {
    this.products = [
      {
        title: 'CARREOLA MAGENTA',
        price: '1200.00',
        imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
        category: 'category1',
        description: 'Carreola Multifuncional, Monbebe Blaze, HB2479BOH, El moderno sistema de viaje blaze cuenta con un elegante marco con un asa de agarre de cuero sintetico ajustable para mayor comodidad para mamá mientras dirige el cochecito o sostiene el asiento para bebés.'
      },
      {
        title: 'CARREOLA',
        price: '879.00',
        imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
        category: 'category2',
        description: 'Carreola de alta calidad con múltiples funciones, ideal para viajes y uso diario. Con marco robusto y detalles elegantes.'
      },
      {
        title: 'MAMELUCO MEDIANO',
        price: '355.50',
        imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
        category: 'category1',
        description: 'Mameluco de tamaño mediano, perfecto para el uso diario de tu bebé. Fabricado con materiales suaves y cómodos.'
      },
      {
        title: 'MAMELUCO GRANDE',
        price: '39.99',
        imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
        category: 'category2',
        description: 'Mameluco grande, ideal para el crecimiento de tu hijo. Diseñado para ofrecer comodidad y durabilidad.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 5',
        price: '588.00',
        imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
        category: 'category1',
        description: 'Descripción detallada del producto 5, incluyendo sus características y ventajas principales.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 6',
        price: 'Sprecio 6',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category2',
        description: 'Descripción detallada del producto 6, destacando sus usos y beneficios para el usuario.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 7',
        price: 'Sprecio 7',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category1',
        description: 'Descripción del producto 7, resaltando sus principales características y su utilidad.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 8',
        price: 'Sprecio 8',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category2',
        description: 'Información del producto 8, con detalles sobre su diseño y ventajas.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 9',
        price: 'Sprecio 9',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category1',
        description: 'Descripción del producto 9, con énfasis en sus características únicas.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 10',
        price: 'Sprecio 10',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category2',
        description: 'Detalles del producto 10, incluyendo su uso recomendado y sus principales beneficios.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 11',
        price: 'Sprecio 11',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category1',
        description: 'Información completa sobre el producto 11, incluyendo características y especificaciones.'
      },
      {
        title: 'IMAGEN DEL PRODUCTO 12',
        price: 'Sprecio 12',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'category2',
        description: 'Descripción del producto 12, con detalles sobre su diseño y utilidad para el usuario.'
      }
    ];
  }

  // Filtra productos por categoría y búsqueda
  get filteredProducts() {
    let filtered = this.products;

    if (this.filter !== 'all') {
      filtered = filtered.filter(product => product.category === this.filter);
    }

    if (this.searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  // Muestra detalles del producto en una alerta
  async showProductInfo(product: any) {
    const alert = await this.alertController.create({
      header: product.title,
      subHeader: product.price,
      message: product.description || 'No description available.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Navega a la página del carrito (ExamplePage)
  goToCart() {
    this.router.navigate(['/example']);  // Navegar a la página del carrito
  }
}
