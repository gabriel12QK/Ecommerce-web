import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(private http:HttpClient) { }

  getProducto(){
    return this.http.get<any>(`${environment.urlApi}producto`)
  }

  

  storeProducto(form:any){
    console.log(form);
    
    debugger
    return this.http.post<any>(`${environment.urlApi}producto`,form)
  }

  updateProducto(form:any, id:number):Observable<any>
  {
    console.log(form);
    
    debugger
    return this.http.post<any>(`${environment.urlApi}producto/${id}`,form)
  }


  destroyProducto(id:number)
  {
    console.log(id);   
    
    debugger
    return this.http.delete<any>(`${environment.urlApi}producto/${id}`)
  }
}