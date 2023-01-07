import { CategoriasInterface } from './../../interfaces/Categorias';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { resCategoriasInterface } from './../../interfaces/resCategorias';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiposInterface } from 'src/app/interfaces/Tipos';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: resCategoriasInterface[] = [];

  isAdd:boolean = false;
  isUpdate:boolean = false;

  public formCategoria!: FormGroup;
  public formUpdateCategoria!: FormGroup;
  
  idForUpdate:number = 0;

  file: File | any;
  fileSelect:any;

  url: string = "http://127.0.0.1:8000/storage/images/categoria/";

  constructor(
    private formBuilder: FormBuilder,
    private categoriaSer: CategoriaService
  ) {

    this.formCategoria = formBuilder.group({
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });

    this.formUpdateCategoria = formBuilder.group({
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.categoriaSer.getCategoria().subscribe({
      next: (res) => {
        this.categorias = [];
        this.categorias = res;
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
      this.formCategoria.controls['imagen'].setValue(this.file.name)

      let data:CategoriasInterface = {
        descripcion: this.formCategoria.value.descripcion,
        imagen: this.file
      }

      if(this.formCategoria.valid){
        this.categoriaSer.store(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
        this.getAll();
        this.isAdd = false;
        this.formCategoria.reset();
        this.fileSelect = null;
      } else {
        this.formCategoria.markAllAsTouched();
        alert("Formulario inválido.");
        this.getAll;
      }

    } else {
      this.formCategoria.markAllAsTouched();
      alert("La imagen es requerida.");

    }
  }

  agregar(){
    this.isAdd = true;
    this.isUpdate = false;
  }

  update(){
    if(this.formUpdateCategoria.valid){
      let data:TiposInterface = { //aqui uso la interface de tipos porque tiene solo el campo descripcion
        descripcion: this.formUpdateCategoria.value.descripcion
      }
      this.categoriaSer.update(data, this.idForUpdate).subscribe({
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
      this.formUpdateCategoria.markAllAsTouched();
      alert("Fomulario inválido.");
    }

  }

  edit(id:number){

    this.idForUpdate = id;

    let cat = this.categorias.find(e => e.id == id);

    if(cat){
      this.formUpdateCategoria.controls['descripcion'].setValue(cat?.descripcion)
    }

    this.isUpdate = true;

  }

  delete(id:number){
    this.categoriaSer.delete(id).subscribe({
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
