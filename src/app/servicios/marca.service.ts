import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {


  constructor(private http:HttpClient) { }

  getMarca(){
    return this.http.get<any>(`${environment.urlApi}marca`)
  }

  /* 

  Registrarmarca(form:any){
    console.log(form);
    
    debugger
    return this.http.post<any>(`${environment.urlApi}marca`,form)
  }

  Guardarmarca()
  {
 
 
    debugger
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"marca";
    return this.http.get<any>(dir, {headers:header});
  }

  Editarmarca(_id:any):Observable<any>
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"marca/"+_id;
    return this.http.get<any>(dir,{headers:header});
  }
  Borrarmarca(_form:any,_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"marca/"+_id;
    return this.http.post<any>(dir,_form,{headers:header});
  }

  Eliminarmarca(_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"marca/"+_id;
   return this.http.post<any>(dir,_id,{headers:header});
  }
 */

}

