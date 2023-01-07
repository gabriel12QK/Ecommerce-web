import { CategoriasInterface } from './../interfaces/Categorias';
import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(private http:HttpClient) { }

  getCategoria(){
    return this.http.get<any>(`${environment.urlApi}categoria`)
  }

  store(form:CategoriasInterface){
    let data = new FormData();
    data.append('descripcion', form.descripcion.toString());
    data.append('imagen', form.imagen);

    return this.http.post<any>(`${environment.urlApi}categoria`, data);
  }

  update(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}categoria/${id}`, form)
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.urlApi}categoria/${id}`)
  }


}