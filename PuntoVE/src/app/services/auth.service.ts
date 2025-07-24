import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage| null = null;

  constructor(private storage: Storage, private router: Router) {
    this.init();
    this.handleAdminStatus() 
   
  }
  async handleAdminStatus() {
  try {
    // 1. Guardar el valor
    await this._storage?.set('isAdmin', true);
    console.log('Valor guardado correctamente');
    
    // 2. Leer el valor
    const isAdmin = await this._storage?.get('isAdmin');
    console.log('Valor recuperado:', isAdmin);
    
    // 3. Usar el valor en la lógica
    if (isAdmin) {
      console.log('El usuario es administrador');
      // Lógica adicional...
    }
  } catch (error) {
    console.error('Error en operaciones de storage:', error);
  }
}
  async init() {
    this._storage = await this.storage.create();
  }

  async login(credentials: {email: string, password: string}) {
    // Aquí verificarías las credenciales con tu backend
    // Ejemplo simplificado:
    let userRole = 'user';
    
    if (credentials.email === 'admin@example.com') {
      userRole = 'admin';
    }
    
    await this._storage?.set('isAdmin', true);
    await this._storage?.set('userRole', userRole);
    
    // Redirigir según el rol
    this.router.navigate([userRole === 'admin' ? 'admin-home' : 'user-home']);
  }

  logout() {
    this._storage?.remove('isAdmin');
    this._storage?.remove('userRole');
    this.router.navigate(['login']);
  }

  isLoggedIn(): Promise<boolean> {
    console.log(1)
    return this._storage?.get('isAdmin') || Promise.resolve(false);
  }

  getUserRole(): Promise<string> {
     console.log(this._storage )
    return this._storage?.get('isAdmin') || Promise.resolve('');
  }
}