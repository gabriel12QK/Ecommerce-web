import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { IngresoProducto } from '../interfaces/ingresoProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(private http:HttpClient) { }

  
  getProducto(){
    return this.http.get<any>(`${environment.urlApi}producto`)
  }

  
  storeProducto(form:IngresoProducto){
    console.log(form);

    let data=new FormData()
    data.append('nombre',form.nombre.toString())
    data.append('precio',form.precio.toString())
    data.append('peso',form.peso.toString())
    data.append('stock',form.stock.toString())
    data.append('imagen',form.imagen)
    data.append('id_categoria',form.id_categoria.toString())
    data.append('id_marca',form.id_marca.toString())
    data.append('id_tipo_peso',form.id_tipo_peso.toString());

 
    return this.http.post<any>(`${environment.urlApi}producto`,data)
  }


  updateProducto(form:any, id:number):Observable<any>{
    console.log(form);
    debugger
    return this.http.post<any>(`${environment.urlApi}producto/${id}`,form)
  }


  destroyProducto(id:number){
    console.log(id);   
    debugger
    return this.http.delete<any>(`${environment.urlApi}producto/${id}`)
  }


}