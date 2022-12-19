import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get<any>(`${environment.urlApi}producto`)
  }

  // public _form = new FormGroup({
  //   nombre: new FormControl('',Validators.required),
  //   precio: new FormControl('',Validators.required),
  //   peso: new FormControl('',Validators.required),
  //   stock: new FormControl('',Validators.required),
  //   imagen: new FormControl('',Validators.required),
  //   id_categoria: new FormControl('',Validators.required),
  //   id_marca: new FormControl('',Validators.required),
  //   id_tipo_peso: new FormControl('',Validators.required),

  
  // })


  Registrarproducto(form:any){
    console.log(form);
    
    debugger
    return this.http.post<any>(`${environment.urlApi}producto`,form)
  }

  Guardarproducto()
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"producto";
    return this.http.get<any>(dir, {headers:header});
  }

  Editarproducto(_id:any):Observable<any>
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"producto/"+_id;
    return this.http.get<any>(dir,{headers:header});
  }
  Borrarproducto(_form:any,_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"producto/"+_id;
    return this.http.post<any>(dir,_form,{headers:header});
  }

  Eliminarproducto(_id:any)
  {
    const header=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    let dir= this.http+"producto/"+_id;
   return this.http.post<any>(dir,_id,{headers:header});
  }


}
