import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { user } from '../models/users.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { Observable } from 'rxjs';
import { AlertController, ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestor = inject(AngularFirestore);
  ultsSvc = inject(UtilsService);
  storge = inject(AngularFireStorage);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);

  // ==================== Autenticación ====================
  getAuth() {
    return getAuth();
  }

  singIn(user: user) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  singUp(user: user) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  singOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.ultsSvc.routerLink('/auth');
  }

  UpdateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // ==================== Firestore ====================
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), { idField: 'id' });
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // ==================== Storage ====================
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path));
    });
  }

  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath;
  }

  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }

  // ==================== UI ====================
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }

  dimissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  // ==================== Métodos CRUD originales ====================
  setMetadata(data: any) {
    return this.firestor.collection('datos').add(data);
  }

  getMetadata(): Observable<any[]> {
    const ref = collection(getFirestore(), 'datos');
    return collectionData(ref, { idField: 'id' }) as Observable<any>;
  }
}