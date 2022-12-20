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
import { PageComponent } from './components/page.component';
import { CardComponent } from './plantilla/card/card.component';
import { CardbodyComponent } from './plantilla/cardbody/cardbody.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    PageComponent,
    CardComponent,
    CardbodyComponent,
    VerPedidosComponent,
    LoginComponent,
    Error404Component,
    DashboardComponent
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
