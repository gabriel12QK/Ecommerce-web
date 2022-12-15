import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    )

    const reqClone = req.clone({ headers });

    return next.handle(reqClone);

  }

}

//no borrar, puede servir en un futuro
/* manejarError(error: HttpErrorResponse){
  console.log('Sucedió un error');
  console.log('Registrado en el log file');
  console.warn(error);
  return throwError('Error personalizado')
} */