import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient) { }


  showOrdenEstado(){
    return this.http.get<any>(`${environment.urlApi}show-orden-estado`)
  }
}
