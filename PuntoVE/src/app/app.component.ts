import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  firebaseSvc: FirebaseService;
  constructor(firebaseSvc:FirebaseService) {
    this.firebaseSvc = firebaseSvc;
    let path = `productos`
    this.firebaseSvc.getDocument(path).then((res)=>{
      console.log(res)
    }).catch(error=>{
      console.log(error)
    })
   
   }
}

