import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

import { IngresoPromocion } from '../interfaces/ingresoPromocion';
import { ResIngresoPromocion  } from '../interfaces/ResIngresoPromocion';
@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(private http:HttpClient) { }

  
  getPromocion(){
    return this.http.get<ResIngresoPromocion []>(`${environment.urlApi}promocion-producto`)
  }

  
  storePromocion(form:IngresoPromocion){
    console.log(form);

    let data=new FormData()
    data.append('stock',form.stock.toString())
    data.append('descuento',form.descuento.toString())
    data.append('fecha_inicio',form.fecha_inicio.toString())
    data.append('fecha_fin',form.fecha_fin.toString())
    data.append('id_producto',form.id_producto.toString());

 
    return this.http.post<any>(`${environment.urlApi}promocion-producto`,data)
  }


  updatePromocion(form:any):Observable<any>{
    console.log(form);
    return this.http.put<any>(`${environment.urlApi}promocion-producto/${form.id}`,form)
  }


  destroyPromocion(id:number){
    console.log(id);   
    debugger
    return this.http.delete<any>(`${environment.urlApi}promocion-producto/${id}`)
  }



}
