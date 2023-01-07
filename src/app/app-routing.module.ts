import { CategoriaComponent } from './components/categoria/categoria.component';
import { MarcaComponent } from './components/marca/marca.component';
import { TipoPromocionComponent } from './components/kits/tipo-promocion/tipo-promocion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RepartidorComponent } from './components/repartidor/repartidor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerPedidosComponent } from './components/ver-pedidos/ver-pedidos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PromocionProductoComponent } from './components/promocion-producto/promocion-producto.component';
import { VerVentasComponent } from './components/ver-ventas/ver-ventas.component';
import { AboutComponent } from './components/about/about.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'ver-ventas',
    component:VerVentasComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ingreso-producto',
    component: IngresoProductoComponent
  },
  {
    path: 'registrar-usuario',
    component: RegistrarUsuarioComponent
  },
  {
    path:'ver-pedidos',
    component:VerPedidosComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'promocion-producto',
    component:PromocionProductoComponent
  },
  {
    path: 'repartidor',
    component: RepartidorComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'kits/tipo-promocion',
    component:  TipoPromocionComponent
  },
  {
    path: 'about',
    component:  AboutComponent
  },
  {
    path: 'marcas',
    component: MarcaComponent
  },
  {
    path: 'categorias',
    component: CategoriaComponent
  },
  



  //si van a poner una rutas ponganla arriba de esto
  //esta ruta nos lleva hacia una pagina de error
  {
    path: '**',
    component: Error404Component
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
