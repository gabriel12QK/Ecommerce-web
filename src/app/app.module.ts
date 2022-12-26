import { InterceptorService } from './interceptors/interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { HeaderComponent } from './plantilla/header/header.component';
import { BreadcrumbsComponent } from './plantilla/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './plantilla/sidebar/sidebar.component';
import { FooterComponent } from './plantilla/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './plantilla/card/card.component';
import { CardbodyComponent } from './plantilla/cardbody/cardbody.component';
import { VerPedidosComponent } from './components/ver-pedidos/ver-pedidos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PipePedidoPipe } from './pipes/pipe-pedido.pipe';
import { PromocionProductoComponent } from './components/promocion-producto/promocion-producto.component';
import { RepartidorComponent } from './components/repartidor/repartidor.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    IngresoProductoComponent,
    RegistrarUsuarioComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    CardComponent,
    CardbodyComponent,
    VerPedidosComponent,
    LoginComponent,
    Error404Component,
    DashboardComponent,
    PerfilComponent,
    PipePedidoPipe,
    PromocionProductoComponent,
    RepartidorComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
