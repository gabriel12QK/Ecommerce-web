import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  guardar()
  {
    const header=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.url+"guardar";
    return this.http.get<any>(dir, {headers:header});
  }

  Storeproducto(form:any){
    const params = new FormData();
    params.set('nombre',form.nombre);
    params.set('precio',form.precio);
    params.set('peso',form.peso);
    params.set('stock',form.stock);
    params.set('imagen',form.imagen);

    return this.http.post<any>(`${environment.urlApi}register`,params)
  }
}
