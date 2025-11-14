import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-ventas-realizadas',
  templateUrl: './ventas-realizadas.component.html',
  styleUrls: ['./ventas-realizadas.component.scss'],
})
export class VentasRealizadasComponent  implements OnInit {
  ventas!:any;
  usuarios!:any;
  ventasSubscription: Subscription;
  datosFiltrados: any[] = [];
   usuarioSeleccionado: any = '0';
   usuariosSubscription!: Subscription;

  fire = inject(FirebaseService)
  constructor() { 
    
  }
filtrarPorUsuario(event: any) {
    const idUsuario = String(event.detail.value);
    console.log(idUsuario)
    this.usuarioSeleccionado = idUsuario;
    console.log(this.usuarioSeleccionado)
    if (idUsuario === '0') {
      // Si selecciona "Todos los Colaboradores", mostrar todo
      this.datosFiltrados = [...this.ventas];
      console.log(this.datosFiltrados)
    } else {
      // Buscar el usuario por su ID
      const usuario = this.usuarios.find(u => u.IdUsuario === idUsuario);
      console.log(usuario.IdUsuario)
      if (usuario) {
        // Filtrar las ventas por el usuario
        // Ajusta la propiedad según tu estructura de datos real
        this.datosFiltrados = this.ventas.filter(
          venta => venta.IdUsuario === usuario.IdUsuario 
        );
        console.log(this.datosFiltrados )
      } else {
        this.datosFiltrados = [];
      }
    }
  }

  // Método alternativo si quieres resetear el filtro
  limpiarFiltro() {
    this.usuarioSeleccionado = 0;
    this.datosFiltrados = [...this.ventas];
  }
   cargarUsuarios() {
    this.usuariosSubscription = this.fire.getUsuarios().subscribe({
      next: (datos) => {
        console.log('Usuarios recibidos:', datos);
        this.usuarios = datos;
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
      }
    });
  }

  cargarVentas() {
    this.ventasSubscription = this.fire.getProductos().subscribe({
      next: (datos) => {
        console.log('Ventas recibidas:', datos);
        this.ventas = datos;
        // Inicializar datos filtrados con todos los datos
        this.datosFiltrados = [...this.ventas];
        console.log(this.datosFiltrados)
      },
      error: (error) => {
        console.error('Error cargando ventas:', error);
      }
    });
  }
  ngOnInit() {
      this.cargarUsuarios();
    this.cargarVentas();
     /*this.fire.getUsuarios().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
        // Aquí puedes asignar los datos a una variable
        this.usuarios = datos;
      },
      error: (error) => {
        console.error('Error:', error);
      }
      });

     this.ventasSubscription = this.fire.getProductos().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
        // Aquí puedes asignar los datos a una variable
        this.ventas = datos;
      },
      error: (error) => {
        console.error('Error:', error);
      }
      });*/
  }
   ngOnDestroy() {
    if (this.ventasSubscription) {
      this.ventasSubscription.unsubscribe();
       this.usuariosSubscription.unsubscribe();
    }
  }
}
