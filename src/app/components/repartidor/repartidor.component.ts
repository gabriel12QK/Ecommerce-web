import { repartidorInterface } from './../../interfaces/repartidorInterface';
import { PerfilService } from './../../servicios/perfil.service';
import { Component, OnInit } from '@angular/core';
import { RepartidorService } from './../../servicios/repartidor.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.component.html',
  styleUrls: ['./repartidor.component.css']
})
export class RepartidorComponent implements OnInit {

  repartidores!:any;

  isAdd:boolean = false;
  isUpdate:boolean = false;

  public formRepartidor!: FormGroup;
  public formEmail!:FormGroup;
  public formPassword!:FormGroup;

  file: File | any;
  fileSelect: any;

  url: string = "http://127.0.0.1:8000/storage/images/repartidor/";


  constructor(private repartidorS: RepartidorService,
              private perfilS: PerfilService,
              private formBuilder: FormBuilder) 
  {
    
    this.formRepartidor=this.formBuilder.group({
      name: ['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      cedula:['',[Validators.required]],
      direccion:['',[Validators.required]],
      referencia:['',[Validators.required]],
      imagen:['',[Validators.required]],
      telefono:['',[Validators.required]],
    })

    //en caso de que se necesite editar solo eso
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.formPassword= this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.getAllRepartidores();

  }



  getAllRepartidores(){
    this.repartidorS.getAllRepartidores().subscribe({
      next: (res) => {
        console.log(res);
        this.repartidores = res;
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  agregarRepartidor(){
    this.isAdd = true;
  }

  regresar(){
    this.isAdd = false;
  }

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  storeRepartidor(){

    /* console.log(this.formRepartidor, this.file); */

    if(this.file){
      this.formRepartidor.controls['imagen'].setValue(this.file.name);

      let data:repartidorInterface = {
        name: this.formRepartidor.value.name,
        last_name: this.formRepartidor.value.last_name,
        email: this.formRepartidor.value.email,
        password: this.formRepartidor.value.password,
        cedula: this.formRepartidor.value.cedula,
        direccion: this.formRepartidor.value.direccion,
        referencia: this.formRepartidor.value.referencia,
        telefono: this.formRepartidor.value.telefono,
        imagen: this.file,
      }

      if(this.formRepartidor.valid){
        this.repartidorS.registroRepartidor(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          }
        })
      } else {
        this.formRepartidor.markAllAsTouched();
      }

    } else {
      console.error("La imagen es requerida.");
    }
  }


  deleteRepartidor(id:any){
    this.repartidorS.eliminarUsuario(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.getAllRepartidores();
  }



  /* editarEmail(formE:any){
    if(this.formEmail.valid){
      this.perfilS.editUserEmail(formE, this.id).subscribe({
        next: (res) => (console.log(res)),
        error: (err) => (console.log(err))
      });
      this.getPerfil(this.id);
      localStorage.setItem('email', formE.email);
      this.isEdited = true;
    }else{
      this.formEmail.markAllAsTouched();
    }
  }

  editarPassword(formP:any){
    if(this.formPassword.valid){
      this.perfilS.editPassword(formP, this.id).subscribe({
        next: (res) => (console.log(res)),
        error: (err) => (console.log(err))
      });
      this.getPerfil(this.id);
      localStorage.setItem('email', formP.email);
      this.isEdited = true;
    }else{
      this.formPassword.markAllAsTouched();
    }
  } */

}
