import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
