import { TiposInterface } from './../interfaces/Tipos';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoPromocionService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(`${environment.urlApi}tipo-promocion`);
  }

  store(form:TiposInterface){
    return this.http.post<any>(`${environment.urlApi}tipo-promocion`, form)
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.urlApi}tipo-promocion/${id}`)
  }

  update(form:any, id:number){
    return this.http.put<any>(`${environment.urlApi}tipo-promocion/${id}`, form)
  }
}
