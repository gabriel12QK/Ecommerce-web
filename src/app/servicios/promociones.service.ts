import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { IngresoPromocion } from '../interfaces/ingreso-promocion';
@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(private http:HttpClient) { }

  
  getPromocion(){
    return this.http.get<IngresoPromocion[]>(`${environment.urlApi}promocion`)
  }

  
  storePromocion(form:IngresoPromocion){
    console.log(form);

    let data=new FormData()
    data.append('stock',form.stock.toString())
    data.append('descuento',form.descuento.toString())
    data.append('fecha_inicio',form.fecha_inicio.toDateString())
    data.append('fecha_fin',form.fecha_fin.toDateString())
    data.append('estado',form.estado.toString());
    data.append('id_producto',form.estado.toString());

 
    return this.http.post<any>(`${environment.urlApi}promocion`,data)
  }


  updatePromocion(form:any):Observable<any>{
    console.log(form);
    return this.http.put<any>(`${environment.urlApi}promocion/${form.id}`,form)
  }


  destroyPromocion(id:number){
    console.log(id);   
    debugger
    return this.http.delete<any>(`${environment.urlApi}promocion/${id}`)
  }



}
