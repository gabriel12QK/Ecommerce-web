import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MarcaService } from 'src/app/servicios/marca.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { TipoPesoService } from 'src/app/servicios/tipo-peso.service';
import { nextTick } from 'process';
import { IngresoProducto } from 'src/app/interfaces/ingresoProducto';

@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css']
})
export class IngresoProductoComponent implements OnInit {

  button: boolean = true;
  tipopeso: any = [];
  producto: any = [];
  categoria: any = [];
  marca: any = [];
  file: File | any;
  fileSelect: any;
  public form !: FormGroup


  constructor(
    private apiProducto: ProductoService,
    private apiCategoria: CategoriaService,
    private apiMarca: MarcaService,
    private apiTipoPeso: TipoPesoService,
    private router: Router,
    private _formB: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this._formB.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      id_categoria: ['',],
      id_marca: ['',],
      id_tipo_peso: ['',],
    });

    this.apiCategoria.getCategoria().subscribe({
      next: (res) => (this.categoria = res),
    })

    this.apiMarca.getMarca().subscribe({
      next: (res) => (this.marca = res),
    })

    this.apiTipoPeso.getTipoPeso().subscribe({
      next: (res) => (this.tipopeso = res),
    })
  }

  getFile(event: any) {
    const archivo = event.target.files[0];
    console.log(archivo);
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    };
    this.file = archivo;
  }

  store(_form: any) {
    console.log(this.file.name);

    if (this.file) {
    
      let data:IngresoProducto={
        nombre:_form.nombre,
        peso:_form.peso,
        precio:_form.precio,
        stock:_form.stock,
        imagen:this.file,
        id_categoria:_form.id_categoria,
        id_marca:_form.id_marca,
        id_tipo_peso:_form.id_tipo_peso,
      }

      this.form.controls['imagen'].setValue(this.file.name);
      if (this.form.valid) {
        console.log(this.form.value);
  
        this.apiProducto.storeProducto(data).subscribe({
          next: (res) => (console.log(res)),
          error: (err) => (console.log(err)),
        })
      }
      else {
        this.form.markAllAsTouched();
      }

    }else{
      console.log("No hay archivo");
    } 
  
  }



  update(_id: any, _form: any) {

    localStorage.setItem("id", _id);
    this.button = false
    this.apiProducto.updateProducto(_form, _id).subscribe(data => {
      let t: any = data;
      this.form.setValue({
        'nombre': t.nombre,
        'precio': t.precio,
        'peso': t.peso,
        'stock': t.stock,
        'id_categoria': 1,
        'id_marca': 1,
        'id_tipo_peso': 1,
        'imagen': t.imagen
      });
      (console.log(data))
      debugger
    });
  }



  destroy(id: any) {
    /*     let _id=localStorage.getItem("id") */
    this.apiProducto.destroyProducto(id).subscribe(data => (console.log(data)));
  }



}