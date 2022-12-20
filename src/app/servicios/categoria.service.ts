import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(private http:HttpClient) { }

  getCategoria(){
    return this.http.get<any>(`${environment.urlApi}categoria`)
  }

  

  /* Registrarcategoria(form:any){
    console.log(form);
    
    debugger
    return this.http.post<any>(`${environment.urlApi}categoria`,form)
  }

  Guardarcategoria()
  {
 
 
    debugger
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"categoria";
    return this.http.get<any>(dir, {headers:header});
  }

  Editarcategoria(_id:any):Observable<any>
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"categoria/"+_id;
    return this.http.get<any>(dir,{headers:header});
  }
  Borrarcategoria(_form:any,_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"categoria/"+_id;
    return this.http.post<any>(dir,_form,{headers:header});
  }

  Eliminarcategoria(_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"categoria/"+_id;
   return this.http.post<any>(dir,_id,{headers:header});
  } */


}