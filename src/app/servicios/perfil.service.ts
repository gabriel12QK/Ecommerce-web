import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http:HttpClient) { }

  //perfil

  getPerfil(id:any){
    return this.http.get<any>(`${environment.urlApi}show/${id}`);
  }

  editUserEmail(form:any, id:any){
    return this.http.post<any>(`${environment.urlApi}update-email/${id}`, form)
  }

  editPassword(form:any, id:any){
    return this.http.post<any>(`${environment.urlApi}update-password/${id}`, form)
  }

}
