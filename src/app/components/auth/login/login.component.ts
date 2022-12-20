import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form !: FormGroup
  constructor(  
    private router:Router,
    private _formB:FormBuilder,
    private logins:LoginService)  { }

  ngOnInit(): void {
      this.form=this._formB.group({
        email: ['',[Validators.required]],
        password:['',[Validators.required, Validators.minLength(8)]],
      });
    }

    login(_form:any){
      console.log(_form);
      if(this.form.valid){
        this.logins.login(_form).subscribe({
          next:(res)=>{
            localStorage.setItem('id', res.id.toString());
            localStorage.setItem('typeUserId', res.typeUserId.toString());
            localStorage.setItem('user', res.userName);
            localStorage.setItem('email', res.email);
            localStorage.setItem('token', res.accesToken);
            localStorage.setItem('rol', res.rol);
            this.router.navigate(['dashboard']);
          }
        })
        console.log("login valido");
      }else{
        this.form.markAllAsTouched();
      }
    }
}
