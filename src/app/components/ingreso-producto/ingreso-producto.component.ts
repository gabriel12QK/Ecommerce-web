import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css']
})
export class IngresoProductoComponent implements OnInit {

  
  public _form !: FormGroup

  constructor(

    private _formB:FormBuilder,
    private router:Router,
   
    ) { }

  ngOnInit(): void {
    this._form=this._formB.group({
      nombre: ['',[Validators.required]],
      precio:['',[Validators.required]],
      peso:['',[Validators.required]],
      stock:['',[Validators.required]],
      imagen:['',[Validators.required]],
      id_categoria:['',[Validators.required]],
      id_marca:['',[Validators.required]],
      id_tipo_peso:['',[Validators.required]],
    })
  }

store(_form:any)
{
   if (this._form.valid) {
    console.log("formulario", _form);
    
   } else {
   
   }
  
   
  }
  
  /* succes(){
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registrado con exito',
        showConfirmButton: false,
         timer: 1500
      }
      )

  } 
  error(){
    swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Asegurese de llenar todos los datos',
      showConfirmButton: false,
       timer: 1500
    }
    )
  }

  cambio(){
    this.router.navigate(['notas'])
  } */
  
}