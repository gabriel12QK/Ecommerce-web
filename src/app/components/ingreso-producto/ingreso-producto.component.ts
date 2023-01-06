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
  idActualizar: number = 0;
  public form!: FormGroup
  public formActualizar !: FormGroup
  url: string = "http://127.0.0.1:8000/storage/images/producto/";

  isUpdate: boolean = false;
  isAdd: boolean = false;
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

    this.formActualizar = this._formB.group({
      id: [''],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      stock: ['', [Validators.required]],
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
    const file1 = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file1);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    }
    this.file = (event.target).files[0];
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
          this.isAdd = false;
          this.getProducto();
          this.form.reset();
          this.fileSelect = null;
        }
        else {
          this.form.markAllAsTouched();
          alert("Formulario inválido.")
        }
       
      } else {
        alert("La imagen es requerida.");
        this.form.markAllAsTouched();
      }

    }

  }

  agregarProducto(){
    this.isAdd = true;
    this.isUpdate = false;
  }

  regresar(){
    this.isAdd = false;
    this.isUpdate = false;
  }

  getProducto() {
    this.apiProducto.getProducto().subscribe({
      next: (res) => {this.producto = res; 
        console.log(res)},
      error: (err) => console.log(err)
    })
  }

  actualizar(id: number) {

    this.idActualizar = id;

    let product = this.producto.find(e => e.id == id);

    if (product) {

      this.formActualizar.controls['id'].setValue(product?.id);
      this.formActualizar.controls['nombre'].setValue(product?.nombre);
      this.formActualizar.controls['peso'].setValue(product?.peso);
      this.formActualizar.controls['precio'].setValue(product?.precio);
      this.formActualizar.controls['stock'].setValue(product?.stock);

      this.formActualizar.controls['id_categoria'].setValue(product?.id_categoria);
      this.formActualizar.controls['id_marca'].setValue(product?.id_marca);
      this.formActualizar.controls['id_tipo_peso'].setValue(product?.id_tipo_peso);

    }
    this.isUpdate = true;
    this.isAdd = false;
  }


  update() {
    if (this.formActualizar.valid) {
      this.apiProducto.updateProducto(this.formActualizar.value, this.idActualizar).subscribe({
        next: (res) => { console.log(res) ; this.getProducto() },
        error: (err) => { console.log(err) }
      });
      this.idActualizar = 0;
      this.getProducto();
      this.isUpdate = false;
      this.formActualizar.reset();
    } else {
      this.formActualizar.markAllAsTouched();
      alert("Formulario actualizar producto inválido.");
    }
  }



  destroy(id: any) {
    this.apiProducto.destroyProducto(id).subscribe(data => (console.log(data)));
  }



}