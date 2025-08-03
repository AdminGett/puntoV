/*005|josue.deluna|Se agraga consulta a solo producto para venta*/
import { Injectable, inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail  } from "firebase/auth";
import { user } from '../models/users.model';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore,setDoc, doc, getDoc, addDoc, collection, collectionData, query,updateDoc,deleteDoc, docData, where} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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
//005 inicio
  getProductoPorCodigo(codigo: string): Observable<any> {
  const db = getFirestore();
  const q = query(
    collection(db, 'datos'),
    where('codigo', '==', codigo) // Busca donde el campo 'codigo' sea igual al valor proporcionado
  );

  return collectionData(q, { idField: 'id' }).pipe(
    map((productos) => productos[0] || null) // Devuelve el primer producto (o null si no existe)
  );
  }
//005 fin
  //**************Optencion de Colavoradores */
  checkIfFieldExists(fieldName: string, password: string): Observable<any> {
  return this.firestor.collection('settingsSystem', ref => 
    ref.where(`DatosEmpresas.SISAR.colaboradores.${fieldName}.contraseña`, '==', password).limit(1)
  ).get().pipe(
    map(querySnapshot => {
      console.log(querySnapshot)
      if (!querySnapshot.empty) {
        // Documento encontrado, devolvemos los datos
        const docData = querySnapshot.docs[0].data();
        console.log('Documento encontrado:', docData);
        return docData;
      } else {
        // No se encontró el documento
        console.log('Documento no encontrado');
        return null;
      }
    }),
    catchError(error => {
      console.error('Error en la búsqueda:', error);
      return of(null); // Devuelve null en caso de error
    })
  );
}
  
}
