import { MarcaService } from 'src/app/servicios/marca.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { resMarcasInterface } from 'src/app/interfaces/resMarcas';
import { MarcasInterface } from 'src/app/interfaces/Marcas';
import { TiposInterface } from 'src/app/interfaces/Tipos';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcas: resMarcasInterface[] = [];

  isAdd:boolean = false;
  isUpdate:boolean = false;

  public formMarcas!: FormGroup;
  public formUpdateMarcas!: FormGroup;
  
  idForUpdate:number = 0;

  file: File | any;
  fileSelect:any;

  url: string = "http://127.0.0.1:8000/storage/images/marca/";

  constructor(
    private formBuilder: FormBuilder,
    private marcaSer: MarcaService
  ) {
    this.formMarcas = formBuilder.group({
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });

    this.formUpdateMarcas = formBuilder.group({
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.getAll();

  }

  getAll(){
    this.marcaSer.getMarca().subscribe({
      next: (res) => {
        this.marcas = []; //esto no se si funcione
        this.marcas = res;
      },
      error: (err) => {
          console.log(err);
      },
    });
  }

  getFile(event:any){
    const file1 = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file1);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    }
    this.file = (event.target).files[0];
  }

  store(){
    if (this.file) {
      this.formMarcas.controls['imagen'].setValue(this.file.name)

      let data:MarcasInterface = {
        descripcion: this.formMarcas.value.descripcion,
        imagen: this.file
      }

      if(this.formMarcas.valid){
        this.marcaSer.store(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
        this.getAll();
        this.isAdd = false;
        this.formMarcas.reset();
        this.fileSelect = null;
      } else {
        this.formMarcas.markAllAsTouched();
        alert("Formulario inválido.");
        this.getAll;
      }

    } else {
      this.formMarcas.markAllAsTouched();
      alert("La imagen es requerida.");

    }
  }

  agregar(){
    this.isAdd = true;
    this.isUpdate = false;
  }

  update(){
    if(this.formUpdateMarcas.valid){
      let data:TiposInterface = { //aqui uso la interface de tipos porque tiene solo el campo descripcion
        descripcion: this.formUpdateMarcas.value.descripcion
      }
      this.marcaSer.update(data, this.idForUpdate).subscribe({
        next(res) {
          console.log(res);
        },
        error(err) {
          console.log(err);
        },
      });
      
      this.getAll();
      this.isUpdate = false;
      this.idForUpdate = 0;
    }else{
      this.formUpdateMarcas.markAllAsTouched();
      alert("Fomulario inválido.");
    }

  }

  edit(id:number){

    this.idForUpdate = id;

    let cat = this.marcas.find(e => e.id == id);

    if(cat){
      this.formUpdateMarcas.controls['descripcion'].setValue(cat?.descripcion)
    }

    this.isUpdate = true;

  }

  delete(id:number){
    this.marcaSer.delete(id).subscribe({
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
