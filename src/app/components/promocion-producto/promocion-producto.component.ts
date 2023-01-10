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
  public formActualizar !: FormGroup
  isUpdate: boolean = false;
  isAdd: boolean = false;
  idActualizar: number =0;

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

    this.formActualizar = this._formB.group({
      id: [''],
      stock: ['', [Validators.required]],
      descuento: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      id_producto:['',],
      
    });
  }

  ngOnInit(): void {
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

    agregarPromocion(){
      this.isAdd = true;
    }
  
    regresar(){
      this.isAdd = false;
      this.isUpdate = false;
    }

    getPromocion() {
      this.apiPromociones.getPromocion().subscribe({
        next: (res) => {this.promocion = res; 
        console.log(res)},
        error: (err) => console.log(err)
      })
    }
  
  
  actualizar(id: number) {
   
    this.idActualizar=id;
    
    let promo = this.promocion.find(e => e.id == id);
    if (promo) {
      this.formActualizar.controls['id'].setValue(promo?.id);
      this.formActualizar.controls['stock'].setValue(promo?.stock);
      this.formActualizar.controls['descuento'].setValue(promo?.descuento);
      this.formActualizar.controls['fecha_inicio'].setValue(promo?.fecha_inicio);
      this.formActualizar.controls['fecha_fin'].setValue(promo?.fecha_fin);
      this.formActualizar.controls['id_producto'].setValue(promo?.id_producto);
    }
    this.isUpdate = true;
  }
  
  update() {
    this.apiPromociones.updatePromocion(this.formActualizar.value, this.idActualizar).subscribe({

      next: (res) => { console.log(res) ; this.getPromocion() },
      error: (err) => { console.log(err) }
    });

  }
  destroy(id: any) {
    /*     let _id=localStorage.getItem("id") */
    this.apiPromociones.destroyPromocion(id).subscribe(data => (console.log(data)));
  }

 
}