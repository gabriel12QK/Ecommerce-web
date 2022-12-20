import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPesoService {


  constructor(private http:HttpClient) { }

  getTipoPeso(){
    return this.http.get<any>(`${environment.urlApi}tipo_peso`)
  }

  
/* 
  Registrartipo_peso(form:any){
    console.log(form);
    
    debugger
    return this.http.post<any>(`${environment.urlApi}tipo_peso`,form)
  }

  Guardartipo_peso()
  {
 
 
    debugger
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"tipo_peso";
    return this.http.get<any>(dir, {headers:header});
  }

  Editartipo_peso(_id:any):Observable<any>
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"tipo_peso/"+_id;
    return this.http.get<any>(dir,{headers:header});
  }
  Borrartipo_peso(_form:any,_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"tipo_peso/"+_id;
    return this.http.post<any>(dir,_form,{headers:header});
  }

  Eliminartipo_peso(_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"tipo_peso/"+_id;
   return this.http.post<any>(dir,_id,{headers:header});
  }
 */

}

