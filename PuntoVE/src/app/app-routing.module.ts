import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanMatchFn } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard  } from './guards/auth.guard';
/**
 * 001|josue.deluna|Modificacion de cambio de panalla de inicio|F-N/A
 */

const routes: Routes = [
  
  {
    path: '',
    // redirectTo: 'home',//001
    // pathMatch: 'full'
    canActivate: [RedirectGuard],
    children: [] 
  },
  {   //001
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },//001 fin 
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule),
    
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'example',
    loadChildren: () => import('./pages/example/example.module').then( m => m.ExamplePageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'panlel-controll-admin',
    loadChildren: () => import('./pages/panlel-controll-admin/panlel-controll-admin.module').then( m => m.PanlelControllAdminPageModule),
     
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
