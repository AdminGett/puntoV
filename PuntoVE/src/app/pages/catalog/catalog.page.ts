import { Component, OnInit, inject } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalCompComponent } from 'src/app/shared/components/modal-comp/modal-comp.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  filter: string = 'all';
  searchQuery: string = '';
  products: any[] = [];
  product!:any
  catSlect:boolean = true
  isExpanded: { [key: number]: boolean } = {}; 

  fare = inject(FirebaseService) 
  alertController = inject(AlertController)
  router = inject(Router)
  modalController=inject(ModalController)

  
 

  ngOnInit() {
    // this.loadProducts();
    this.fare.getMetadata().subscribe((data:any)=>{
      this.products = data
   })
  }

  // loadProducts() {
  //   this.products = [
  //     {
  //       title: 'CARREOLA MAGENTA',
  //       price: '1200.00',
  //       imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
  //       category: 'category1',
  //       description: 'Carreola Multifuncional, Monbebe Blaze, HB2479BOH, El moderno sistema de viaje blaze cuenta con un elegante marco con un asa de agarre de cuero sintetico ajustable para mayor comodidad para mamá mientras dirige el cochecito o sostiene el asiento para bebés.',
  //       rating: 4,
  //       colors: ['#ff0000', '#00ff00', '#0000ff']
  //     },
  //     {
  //       title: 'CARREOLA',
  //       price: '879.00',
  //       imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
  //       category: 'category2',
  //       description: 'Carreola de alta calidad con múltiples funciones, ideal para viajes y uso diario. Con marco robusto y detalles elegantes.',
  //       rating: 5,
  //       colors: ['#ffcc00', '#ff9900']
  //     },
  //     {
  //       title: 'MAMELUCO MEDIANO',
  //       price: '355.50',
  //       imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
  //       category: 'category1',
  //       description: 'Mameluco de tamaño mediano, perfecto para el uso diario de tu bebé. Fabricado con materiales suaves y cómodos.',
  //       rating: 3,
  //       colors: ['#ff0000']
  //     },
  //     {
  //       title: 'MAMELUCO GRANDE',
  //       price: '39.99',
  //       imageUrl: 'https://http2.mlstatic.com/carreola-carriola-cochesito-bebe-graco-literider-marco-D_NQ_NP_115201-MLM20294155072_052015-F.jpg',
  //       category: 'category2',
  //       description: 'Mameluco grande, ideal para el crecimiento de tu hijo. Diseñado para ofrecer comodidad y durabilidad.',
  //       rating: 4,
  //       colors: ['#ff00ff', '#ffcc00']
  //     },
  //     // Resto de los productos con su respectiva información de rating y colores
  //   ];
  // }

  get filteredProducts() {
    let filtered = this.products;
    if (this.filter !== 'all') {
      filtered = filtered.filter(dataP => dataP.categoria === this.filter);
    }
    
    if (this.searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  async showProductInfo(product: any) {
    const alert = await this.alertController.create({
      header: product.nombre,
      subHeader: product.prNeto,
//       message:  `<div class="msAler">
//       <div class="image-container"> 
//     <img  src="${product.img}" alt="Imagen del producto" style="max-width: 30%;">
//   </div>
//   <div class="text-container">
//     <p>${ product.nombre }</p>
//     <p>${product.prNeto}</p> 
//     <p>${ product.description || 'No description available.' }</p>
//   </div>
// </div>
//     `,
      message:product.description || 'No description available.',
      buttons: ['OK']
    });

    await alert.present();
  }
  addCar(){
    
  }
  
  goToCart() {
    this.router.navigate(['/example']);
  }
  async dismiss(product:any){
      this.product=product
    const modal = await this.modalController.create({
      component: ModalCompComponent,
      componentProps: {
        Product: this.product,
        modalStyle: 'my-custom-modal'
      },
      cssClass: 'my-custom-modal',
    });
     await modal.present();
     const { data } = await modal.onWillDismiss(); 

     if (data && data.dismissed && data.selectedProduct) { 
     console.log(data.selectedProduct); 
      // Realizar acciones con el producto seleccionado
     }
  
  }
  toggleProduct(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }
  redLog(){
    
  }
}
