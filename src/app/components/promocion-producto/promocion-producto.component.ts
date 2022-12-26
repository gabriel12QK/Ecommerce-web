import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { PromocionesService } from 'src/app/servicios/promociones.service';

import { IngresoPromocion } from 'src/app/interfaces/ingresoPromocion';
import { ResIngresoPromocion } from 'src/app/interfaces/ResIngresoPromocion';

@Component({
  selector: 'app-promocion-producto',
  templateUrl: './promocion-producto.component.html',
  styleUrls: ['./promocion-producto.component.css']
})
export class PromocionProductoComponent implements OnInit {
  button: boolean = true;
  promocion: ResIngresoPromocion[] = [];
  producto: any = [];
  public form !: FormGroup
  isUpdate: boolean = false;

   constructor(
    private _formB: FormBuilder,
    private apiPromociones: PromocionesService,
    private apiProducto: ProductoService
    ) {
    this.form = this._formB.group({
      id: [''],
      stock: ['', [Validators.required]],
      descuento: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      id_producto:['',],
      
    });
  }

  ngOnInit(): void {
    this.apiProducto.getProducto().subscribe({
      next: (res) => {
        this.producto = res;
        console.log(this.producto);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.getPromocion();
  }


  store() {

    let data: IngresoPromocion = {
      id: 0,
      stock: this.form.value.stock,
      descuento: this.form.value.descuento,
      fecha_inicio: this.form.value.fecha_inicio,
      fecha_fin: this.form.value.fecha_fin,
      id_producto:this.form.value.id_producto
     }

      if (this.form.valid) {
          this.apiPromociones.storePromocion(data).subscribe({
            next: (res) => (console.log(res)),
            error: (err) => (console.log(err)),
          });
        }
        else {
          this.form.markAllAsTouched();
        }
    }
  
  
   
    getPromocion() {
      this.apiPromociones.getPromocion().subscribe({
        next: (res) => {this.promocion = res; 
        console.log(res)},
        error: (err) => console.log(err)
      })
    }
  
  
  actualizar(id: number) {
    this.isUpdate = true;

    let promo = this.promocion.find(e => e.id == id);
    if (promo) {
      this.form.controls['id'].setValue(promo?.id);
      this.form.controls['stock'].setValue(promo?.stock);
      this.form.controls['descuento'].setValue(promo?.descuento);
      this.form.controls['fecha_inicio'].setValue(promo?.fecha_inicio);
      this.form.controls['fecha_fin'].setValue(promo?.fecha_fin);
      this.form.controls['id_producto'].setValue(promo?.id_producto);
    }
  }
  
  update() {
    this.apiPromociones.updatePromocion(this.form.value).subscribe({

      next: (res) => { console.log(res) ; this.getPromocion() },
      error: (err) => { console.log(err) }
    });

  }
  destroy(id: any) {
    /*     let _id=localStorage.getItem("id") */
    this.apiPromociones.destroyPromocion(id).subscribe(data => (console.log(data)));
  }
}