import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Íconos de categorías
  categories = [
    { name: 'Tecnología', icon: 'desktop-outline' },
    { name: 'Gimnasio', icon: 'barbell-outline' },
    { name: 'Hogar', icon: 'home-outline' },
    { name: 'Deportes', icon: 'american-football-outline' },
    { name: 'Automotriz', icon: 'car-outline' }
  ];

  // Productos con descuentos
  discountedProducts = [
    { image: 'assets/img/prod1.png', description: 'Detergente XYZ' },
    { image: 'assets/img/prod2.png', description: 'Suavizante ABC' },
    { image: 'assets/img/prod3.png', description: 'Limpiador Multiusos' },
    { image: 'assets/img/prod4.png', description: 'Desinfectante' },
    { image: 'assets/img/prod5.png', description: 'Shampoo para ropa' },
    { image: 'assets/img/prod6.png', description: 'Jabón líquido' }
  ];

  // Recomendaciones personalizadas
  recommendedProducts = [
    { image: 'assets/img/reco1.png', description: 'Gel antibacterial', price: 25.00 },
    { image: 'assets/img/reco2.png', description: 'Toallas húmedas', price: 35.00 },
    { image: 'assets/img/reco3.png', description: 'Cloro especial', price: 29.90 }
  ];

  constructor() { }

  ngOnInit() {
    // Aquí podrías cargar los productos desde un servicio si tuvieras backend
  }

}
