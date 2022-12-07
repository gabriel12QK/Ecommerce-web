import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';



const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'ingreso-producto',
    component: IngresoProductoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
