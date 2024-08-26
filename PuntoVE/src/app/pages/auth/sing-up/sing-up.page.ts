import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { user } from 'src/app/models/users.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })
  
  firebaseSvc =inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading()
      await loading.present()

      this.firebaseSvc.singUp(this.form.value as user).then(async res=>{
         await this.firebaseSvc.UpdateUser(this.form.value.name)
        let uid = res.user.uid
        this.form.controls.uid.setValue(uid)
        
        this.setUserInfo(uid)
      }).catch(error=>{
        console.log(error)
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position:'middle',
          icon: 'alert-circle'
        })
      }).finally(()=>{
        loading.dismiss()
      })
    }
  }
  async setUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading()
      await loading.present()
      let path =`users/${uid}`
      delete this.form.value.password
      this.firebaseSvc.setDocument(path, this.form.value).then(async res=>{
       
        this.utilsSvc.savelocalStorage('user', this.form.value)
        this.utilsSvc.routerLink('/main/home')
        this.form.reset()
        
      }).catch(error=>{
        console.log(error)
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position:'middle',
          icon: 'alert-circle'
        })
      }).finally(()=>{
        loading.dismiss()
      })
    }
  }

}