import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';



const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'ingreso-producto',
    component: IngresoProductoComponent
  },
  {
    path: 'registrar-usuario',
    component: RegistrarUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
