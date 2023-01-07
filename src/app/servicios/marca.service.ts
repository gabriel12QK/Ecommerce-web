import { MarcasInterface } from './../interfaces/Marcas';
import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {


  constructor(private http:HttpClient) { }

  getMarca(){
    return this.http.get<any>(`${environment.urlApi}marca`)
  }

  store(form:MarcasInterface){
    let data = new FormData();
    data.append('descripcion', form.descripcion.toString());
    data.append('imagen', form.imagen);

    return this.http.post<any>(`${environment.urlApi}marca`, data);
  }

  update(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}marca/${id}`, form)
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.urlApi}marca/${id}`)
  }

  

}

