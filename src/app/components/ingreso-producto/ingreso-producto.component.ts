import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MarcaService } from 'src/app/servicios/marca.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { TipoPesoService } from 'src/app/servicios/tipo-peso.service';
import { nextTick } from 'process';

@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css']
})
export class IngresoProductoComponent implements OnInit {

  button:boolean=true;
  tipo:any = [];
  animals:any = [];

  public _form !: FormGroup
  private _formB!:FormBuilder

    constructor(private api:ProductoService, private router:Router) {

    }

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
 
  this.api.Registrarproducto(_form).subscribe({
  next:(res)=>(console.log("hola")),
})

  if(this._form){
   
  } else {

    this._form.markAllAsTouched()
   
   }
}
   
  


  registrar(_form:any){
    this.api.Registrarproducto(_form).subscribe(data=>(console.log(data)));
    
  }

  editar(_id:any){
    localStorage.setItem("id",_id);
    this.button=false
   this.api.Editarproducto(_id).subscribe(data=>{ 
      let t:any=data;
      this._form.setValue({
      'nombre':t.nombre,
      'precio':t.precio,
      'peso':t.peso,
      'stock':t.stock,
      'id_categoria':t.id_categoria,
      'id_marca':t.id_marca,
      'id_tipo_peso':t.id_tipo_peso,
      'imagen':t.imagen
      });
      (console.log(data))
    });
  }

  borrar(_form:any){
    let _id=localStorage.getItem("id")
    this.api.Borrarproducto(_form,_id).subscribe(data=>(console.log(data)));
  }

 eliminar(_id:any){
    this.api.Eliminarproducto(_id).subscribe(data=>(console.log(data)));
  }


  
}