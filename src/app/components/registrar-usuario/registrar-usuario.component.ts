import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  public _form !: FormGroup

  constructor(
    private _formB:FormBuilder,
    private router:Router,
  ) {
   }

  ngOnInit(): void {
    this._form=this._formB.group({
      nombre: ['',[Validators.required]],
      apellido:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      cedula:['',[Validators.required]],
      direccion:['',[Validators.required]],
      imagen:['',[Validators.required]],
      telefono:['',[Validators.required]],
    })
  }

  store(_form:any)
{
   if (this._form.valid) {
    console.log("formulario", _form);
    
   } else {
   
   }
  
   
  }

  }


