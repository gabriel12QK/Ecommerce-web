import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class RepartidorService {

  constructor(private http: HttpClient) { }

  getAllRepartidores(){
    return this.http.get<any>(`${environment.urlApi}getAllRepartidores`);
  }
}
