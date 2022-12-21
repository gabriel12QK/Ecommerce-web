import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MarcaService } from 'src/app/servicios/marca.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { TipoPesoService } from 'src/app/servicios/tipo-peso.service';

import { IngresoProducto } from 'src/app/interfaces/ingresoProducto';
import { ResIngresoProducto } from 'src/app/interfaces/ResIngresoProducto';

@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css']
})
export class IngresoProductoComponent implements OnInit {

  button: boolean = true;
  tipopeso: any = [];
  producto: ResIngresoProducto[] = [];
  categoria: any = [];
  marca: any = [];
  file: File | any;
  fileSelect: any;
  public form !: FormGroup
  url: string = "http://127.0.0.1:8000/storage/images/producto/";

  isUpdate: boolean = false;

  constructor(
    private apiProducto: ProductoService,
    private apiCategoria: CategoriaService,
    private apiMarca: MarcaService,
    private apiTipoPeso: TipoPesoService,
    private _formB: FormBuilder
  ) {
    this.form = this._formB.group({
      id: [''],
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

  store() {

    if (this.isUpdate) {
      this.update();

    } else {
      if (this.file) {

        this.form.controls['imagen'].setValue(this.file.name);

        let data: IngresoProducto = {
          id: 0,
          nombre: this.form.value.nombre,
          peso: this.form.value.peso,
          precio: this.form.value.precio,
          stock: this.form.value.stock,
          imagen: this.file,
          id_categoria: this.form.value.id_categoria,
          id_marca: this.form.value.id_marca,
          id_tipo_peso: this.form.value.id_tipo_peso,
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

  }

  getProducto() {
    this.apiProducto.getProducto().subscribe({
      next: (res) => {this.producto = res; console.log(res)},
      error: (err) => console.log(err)
    })
  }

  actualizar(id: number) {
    this.isUpdate = true;

    let product = this.producto.find(e => e.id == id);
    if (product) {
      this.form.controls['id'].setValue(product?.id);
      this.form.controls['nombre'].setValue(product?.nombre);
      this.form.controls['peso'].setValue(product?.peso);
      this.form.controls['precio'].setValue(product?.precio);
      this.form.controls['stock'].setValue(product?.stock);

      this.form.controls['id_categoria'].setValue(product?.id_categoria);
      this.form.controls['id_marca'].setValue(product?.id_marca);
      this.form.controls['id_tipo_peso'].setValue(product?.id_tipo_peso);

    }
  }


  update() {
    this.apiProducto.updateProducto(this.form.value).subscribe({

      next: (res) => { console.log(res) ; this.getProducto() },
      error: (err) => { console.log(err) }
    });

  }



  destroy(id: any) {
    /*     let _id=localStorage.getItem("id") */
    this.apiProducto.destroyProducto(id).subscribe(data => (console.log(data)));
  }



}