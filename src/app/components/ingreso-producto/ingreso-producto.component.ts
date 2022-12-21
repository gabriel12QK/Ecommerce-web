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
  url: string = "http://127.0.0.1:8000/storage/images/producto/";


  constructor(
    private apiProducto: ProductoService,
    private apiCategoria: CategoriaService,
    private apiMarca: MarcaService,
    private apiTipoPeso: TipoPesoService,
    private router: Router,
    private _formB: FormBuilder
  ) {
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
  }

  ngOnInit(): void {

    this.apiCategoria.getCategoria().subscribe({
      next: (res) => (this.categoria = res),
    });

    this.apiMarca.getMarca().subscribe({
      next: (res) => (this.marca = res),
    });

    this.apiTipoPeso.getTipoPeso().subscribe({
      next: (res) => (this.tipopeso = res),
    });

    this.getProducto();
  }

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  store(_form: any) {

    if (this.file) {

      this.form.controls['imagen'].setValue(this.file.name);

      let data: IngresoProducto = {
        nombre: _form.nombre,
        peso: _form.peso,
        precio: _form.precio,
        stock: _form.stock,
        imagen: this.file,
        id_categoria: _form.id_categoria,
        id_marca: _form.id_marca,
        id_tipo_peso: _form.id_tipo_peso,
      }

      if (this.form.valid) {
        this.apiProducto.storeProducto(data).subscribe({
          next: (res) => (console.log(res)),
          error: (err) => (console.log(err)),
        });
      }
      else {
        this.form.markAllAsTouched();
      }

    }

  }

  getProducto() {
    this.apiProducto.getProducto().subscribe({
      next: (res) => { this.producto = res; console.log(res) },
      error: (err) => console.log(err)
    })
  }


  update(_id: any, _form: any) {

    localStorage.setItem("id", _id);
    this.button = false
    if (this.form.valid) {


      this.apiProducto.updateProducto(_form, _id).subscribe({

        next:(res)=>{ console.log(res)},
        error:(err)=>{ console.log(err)}
      });
    }
  }



  destroy(id: any) {
    /*     let _id=localStorage.getItem("id") */
    this.apiProducto.destroyProducto(id).subscribe(data => (console.log(data)));
  }



}