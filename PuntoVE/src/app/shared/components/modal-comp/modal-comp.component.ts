import { Component, Input, OnInit,inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from '../../../services/firebase.service';
import { orderBy, } from 'firebase/firestore';
import { Storage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.scss'],
})
export class ModalCompComponent  implements OnInit {
  @Input() Product:any;  
  @Input() modalStyle: string;
  
 constructor( private modalController:ModalController){
 }
  closeModal() {
    this.modalController.dismiss({ 
      'dismissed': true, 
      'selectedProduct': this.Product ,
    });
  }
  product:any = {
    rating: 3.5, // Ejemplo de rating
    // ... otras propiedades
  };
  carrito(){
    
    if(this.Product){
      console.log(1)
    }
  }

  ngOnInit() {
  }

}
