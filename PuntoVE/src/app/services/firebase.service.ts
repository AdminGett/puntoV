import { Injectable, inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail  } from "firebase/auth";
import { user } from '../models/users.model';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore,setDoc, doc, getDoc, addDoc, collection, collectionData, query,updateDoc,deleteDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { Observable } from 'rxjs';
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth)
  firestor = inject(AngularFirestore)
  ultsSvc = inject(UtilsService)
  storge = inject(AngularFireStorage)
  modalCtrl = inject(ModalController)
  
  alertCtrl = inject(AlertController)


  // ========================== Base de datos ==================
  //====== Optener documentos de una colleccion =========
  getCollectionData( path: string, collectionQuery?:any){
    
    const ref = collection(getFirestore(), path)
    console.log(ref)
    return collectionData(query(ref, ...collectionQuery),{idField:'id'})
  }
  getCollection( path: string, collectionQuery?:any){
    
    const ref = collection(getFirestore(), path)
    console.log(ref)
    return collectionData(query(ref, ...collectionQuery),{idField:'id'})
  }



  //====== Autenticacion =========

  getAuth(){
    return getAuth()
  }
//   //==== Acceder =====
  singIn(user: user){
    console.log(user)
     return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }
  
  //==== Registrar =====
  singUp(user: user){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
 }
 //========cerrar cesion =============
 singOut(){
  getAuth().signOut()
  localStorage.removeItem('user')
  this.ultsSvc.routerLink('/auth')
 }
  //==== Actualizar Usiario =====
  UpdateUser(displayName: string){
     return updateProfile(getAuth().currentUser, { displayName });
 }
  //  ===================== enviar emeil para restablecer contraseña 
 sendRecoveryEmail(email:string){
  return sendPasswordResetEmail(getAuth(),email)
 }
 //================= Base de datos =========================
 setDocument(path: string, data:any){
  return setDoc(doc(getFirestore(), path),data);
 }
 //================= Actualizar un documento =========================
 updateDocument(path: string, data:any){
  return updateDoc(doc(getFirestore(), path),data);
 }
  //================= eliminar un documento =========================
  deleteDocument(path: string){
    return deleteDoc(doc(getFirestore(), path));
   }
 //============ optener documento ================
async getDocument( path: string){
  return (await getDoc(doc(getFirestore(), path))).data()
  
}
// =============== Agregar un nuevo documento =================
  addDocument(path: string, data:any){
    return addDoc(collection(getFirestore(), path),data);
  }
  addDoc(path: string, data:any){
    return addDoc(collection(getFirestore(), path),data);
  }



// =============== almacenamiento =================

// ======== subir imagen ========
  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(), path),data_url,'data_url').then(()=>{
      return getDownloadURL(ref(getStorage(),path))
    })
  }
  // ======== Optener ruta de las imagenes con su url ========
  async getFilePath( url : string ){
    return ref(getStorage(), url).fullPath
  }
    // ======== Eliminar afoto ========
  deleteFile(path: string){
    return deleteObject(ref(getStorage(), path))
  }



  // =========Modal ============
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss()
    if (data) return data
  }
  dimissModal(data?: any) {
    return this.modalCtrl.dismiss(data)
  }
  // **************CRUD colecion de datos ********************
  setMetadata(data){ 
    console.log(data)
    
    return this.firestor.collection('datos').add(data)
  } 
  getMetadata():Observable<any[]> {
    const ref = collection(getFirestore(), 'datos')
    return collectionData(ref,{idField:'id'}) as Observable<any>
    // return this.firestor.collection('datos').valueChanges();
  }

  
}
