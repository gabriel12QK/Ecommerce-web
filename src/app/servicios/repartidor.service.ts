import { repartidorInterface } from './../interfaces/repartidorInterface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class RepartidorService {

  constructor(private http: HttpClient) { }

  getAllRepartidores(){
    return this.http.get<any>(`${environment.urlApi}getAllRepartidores`);
  }

  registroRepartidor(form:repartidorInterface){
    let data = new FormData();
    data.append('name', form.name.toString());
    data.append('last_name', form.last_name.toString());
    data.append('email', form.email.toString());
    data.append('password', form.password.toString());
    data.append('cedula', form.cedula.toString());
    data.append('direccion', form.direccion.toString());
    data.append('referencia', form.referencia.toString());
    data.append('telefono', form.telefono.toString());
    data.append('imagen', form.imagen);
    
    return this.http.post<any>(`${environment.urlApi}registro-repartidor`, data);
  }

  eliminarUsuario(id:any){ //sirve para repartidores y usuarios
    return this.http.delete<any>(`${environment.urlApi}delete-usuario/${id}`);
  }

  actualizarUsuario(form:any, id:number){
    return this.http.post<any>(`${environment.urlApi}usuario-update/${id}`, form);
  }


}
