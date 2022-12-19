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
  file: File | any;
  fileSelect: any;
  public form !: FormGroup
  

    constructor(
      private api:ProductoService, 
      private router:Router,
      private _formB:FormBuilder
      ) {

    }

  ngOnInit(): void {
    this.form=this._formB.group({
      nombre: ['',[Validators.required]],
      precio:['',[Validators.required]],
      peso:['',[Validators.required]],
      stock:['',[Validators.required]],
      imagen:['',[Validators.required]],
      id_categoria:['',],
      id_marca:['',],
      id_tipo_peso:['',],
    })
  }

  getFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    };
    this.file = (event.target).files[0];
  }

store(_form:any)
{
 
//   this.api.Registrarproducto(_form).subscribe({
//   next:(res)=>(console.log("hola")),
// })
    if (this.file) {
    this.form.controls['imagen'].setValue(this.file.name);

  }
  if(this.form.valid)
  {
   this.api.Registrarproducto(_form).subscribe({
    next:(res)=>(console.log(res)),
  })
  } 
  else 
  {
   this.form.markAllAsTouched();
   }
}
   


  editar(_id:any){
    localStorage.setItem("id",_id);
    this.button=false
   this.api.Editarproducto(_id).subscribe(data=>{ 
      let t:any=data;
      this.form.setValue({
      'nombre':t.nombre,
      'precio':t.precio,
      'peso':t.peso,
      'stock':t.stock,
      'id_categoria':1,
      'id_marca':1,
      'id_tipo_peso':1,
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