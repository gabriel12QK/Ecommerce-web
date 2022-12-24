import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { repartidorInterface } from '../interfaces/repartidorInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getAllUsuarios(){
    return this.http.get<any>(`${environment.urlApi}getAllUsuarios`)
  }

  registroUsuario(form:repartidorInterface){
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
    
    return this.http.post<any>(`${environment.urlApi}registro`, data);
  }


}
