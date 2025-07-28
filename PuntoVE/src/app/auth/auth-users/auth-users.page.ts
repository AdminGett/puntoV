import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { user } from 'src/app/models/users.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.page.html',
  styleUrls: ['./auth-users.page.scss'],
  standalone:false,
})
export class AuthUsersPage implements OnInit {
 ID: boolean | undefined;

  form = new FormGroup({
    ID: new FormControl('', [Validators.required]),
    pass:  new FormControl('', [Validators.required])
  })

  firebaseSvc =inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }
  async submit(){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading()
      await loading.present()
       this.firebaseSvc.checkIfFieldExists(this.form.value.ID, this.form.value.pass)
    .subscribe({
      next: async (exists) => {
        this.ID = exists;
        console.log('¿Existe el usuario?', exists);
        await loading.dismiss(); // Cierra el loading cuando se completa
        this.Redirecciona();
      },
      error: async (err) => {
        console.error('Error en la verificación:', err);
        await loading.dismiss(); // Cierra el loading si hay error
        // Opcional: mostrar mensaje de error al usuario
        await this.utilsSvc.presentToast({
          message: 'Error al verificar usuario',
          duration: 2000,
          color: 'danger'
        });
      }
    });
    }
    
  }
  Redirecciona(){
    if(this.form.valid){
      
     this.utilsSvc.routerLink('/punto-venta')
    }
    
  }
  
}
