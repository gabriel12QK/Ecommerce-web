import { TipoPromocionService } from './../../../servicios/tipo-promocion.service';
import { TiposInterface } from './../../../interfaces/Tipos';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResTiposInterface } from 'src/app/interfaces/resTipos';

@Component({
  selector: 'app-tipo-promocion',
  templateUrl: './tipo-promocion.component.html',
  styleUrls: ['./tipo-promocion.component.css']
})
export class TipoPromocionComponent implements OnInit {

  tipos_promocion:ResTiposInterface[] = [];

  isAdd:boolean = false;
  isUpdate:boolean = false;

  public formTipoPromocion!: FormGroup;
  
  idForUpdate:number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private tipoPromocionS: TipoPromocionService
  ) {
    this.formTipoPromocion = this.formBuilder.group({
      descripcion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.tipoPromocionS.getAll().subscribe({
      next: (res) => {
        /* console.log(res); */
        this.tipos_promocion = res;
      },
      error(err) {
        console.log(err);
      },
    })
  }

  store(){
    
    if(this.formTipoPromocion.valid){
      let data:TiposInterface = {
        descripcion: this.formTipoPromocion.value.descripcion
      }
      this.tipoPromocionS.store(data).subscribe({
        next(res) {
          console.log(res);
        },
        error(err) {
          console.log(err);
        },
      });
      this.getAll();
      this.isAdd = false;
      this.formTipoPromocion.reset();
    }
    else{
      this.formTipoPromocion.markAllAsTouched();
      alert("Fomulario inválido.");
    }
  }
  
  agregar(){
    this.isAdd = true;
    this.isUpdate = false;
  }

  update(){
    if(this.formTipoPromocion.valid){
      let data:TiposInterface = {
        descripcion: this.formTipoPromocion.value.descripcion
      }
      this.tipoPromocionS.update(data, this.idForUpdate).subscribe({
        next(res) {
          console.log(res);
        },
        error(err) {
          console.log(err);
        },
      });
      this.idForUpdate = 0;
      this.getAll();
      this.isUpdate = false;
    }else{
      this.formTipoPromocion.markAllAsTouched();
      alert("Fomulario inválido.");
    }

  }

  edit(id:number){

    this.idForUpdate = id;

    let tp = this.tipos_promocion.find(e => e.id == id);

    if(tp){
      this.formTipoPromocion.controls['descripcion'].setValue(tp?.descripcion)
    }

    this.isUpdate = true;

  }

  delete(id:number){
    this.tipoPromocionS.delete(id).subscribe({
      next: (value) => {
        console.log(value);
        this.getAll();
      }, error(err) {
        console.log(err);
      },
    });
  }

  regresar(){
    this.isAdd = false;
    this.isUpdate = false;
  }

}
