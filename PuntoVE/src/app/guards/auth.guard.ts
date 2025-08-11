// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) {}

// canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
//    const expectedRole = route.data['role']; // Cambiado a notación de corchetes
//       console.log(3)
//    return this.authService.getUserRole().then(userRole => {
//         if (!this.authService.isLoggedIn()) {
//             console.log(5)
//             this.router.navigate(['home']);
//             return false;
//         }
//         console.log(6)
//         if (expectedRole && userRole !== expectedRole) {
//           console.log(7)
//             this.router.navigate([userRole === 'admin' ? 'admin-home' : 'auth']);
//             return false;
//         }
        
//         return true;
//     });
//   }
// }
// redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  redirectTo!:string
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const local = localStorage.getItem('isAdmin') 
   
    // Obtener la variable del localStorage
    // if(local === 'true'){
    //   this.redirectTo = 'auth-users';
    // }else{
    //   this.redirectTo = 'home';
    //   console.log(this.redirectTo)
    // }
    // Redirigir a la página especificada
    //return this.router.createUrlTree([this.redirectTo]);


    const userType = localStorage.getItem('userType');
    console.log(userType)
    // Determine the redirect path based on user type
    let redirectPath: string;
    
    switch(userType) {
      case '1':
        console.log(userType)
        redirectPath = 'menu'; // or 'auth-users' as in your original
        break;
      case '2':
        redirectPath = 'catalog';
        break;
      case 'user':
        redirectPath = 'user-dashboard';
        break;
      default:
        // Default path for unauthenticated or unknown user types
        redirectPath = 'home';
    }
    
    // Redirect to the appropriate path
    return this.router.createUrlTree([redirectPath]);
  }
}