import { ResRespartidorInterface } from './../../interfaces/resRepartidorInterface';
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

  repartidores: ResRespartidorInterface[] = [];

  isAdd:boolean = false;
  isUpdate:boolean = false;

  public formRepartidor!: FormGroup;
  public formUpdateRepartidor!: FormGroup;
  public formEmail!:FormGroup;
  public formPassword!:FormGroup;

  idForUpdate:number = 0;

  file: File | any;
  fileSelect: any;

  url: string = "http://127.0.0.1:8000/storage/images/repartidor/"; //esto no se está usando


  constructor(private repartidorS: RepartidorService,
              private perfilS: PerfilService,
              private formBuilder: FormBuilder) 
  {
    
    this.formRepartidor=this.formBuilder.group({
      name: ['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
      cedula:['',[Validators.required]],
      direccion:['',[Validators.required]],
      referencia:['',[Validators.required]],
      imagen:['',[Validators.required]],
      telefono:['',[Validators.required]],
    });

    this.formUpdateRepartidor=this.formBuilder.group({
      name: ['',[Validators.required]],
      last_name:['',[Validators.required]],
      cedula:['',[Validators.required]],
      direccion:['',[Validators.required]],
      referencia:['',[Validators.required]],
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
        /* console.log(res); */
        this.repartidores = res;
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  agregarRepartidor(){
    this.isAdd = true;
    this.isUpdate = false;
  }

  regresar(){
    this.isAdd = false;
    this.isUpdate = false;
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
        });
        this.getAllRepartidores();
        this.isAdd = false;
        this.formRepartidor.reset();
        //aqui deberia ir para resetear el input de la imagen pero al
        //parecer se resetea solo
      } else {
        this.formRepartidor.markAllAsTouched();
      }

    } else {
      /* console.error("La imagen es requerida."); */
      alert("La imagen es requerida.");
      this.formRepartidor.markAllAsTouched();
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


  editRepartidor(id:number){

    this.idForUpdate = id; 
    
    let repartidor = this.repartidores.find(e => e.id == id);

    if(repartidor){
      //datos normales
      this.formUpdateRepartidor.controls['name'].setValue(repartidor?.name);
      this.formUpdateRepartidor.controls['last_name'].setValue(repartidor?.last_name);
      this.formUpdateRepartidor.controls['cedula'].setValue(repartidor?.cedula);
      this.formUpdateRepartidor.controls['direccion'].setValue(repartidor?.direccion);
      this.formUpdateRepartidor.controls['referencia'].setValue(repartidor?.referencia);
      this.formUpdateRepartidor.controls['telefono'].setValue(repartidor?.telefono);

      //email
      this.formEmail.controls['email'].setValue(repartidor?.email);

    }

    /* console.log(repartidor);
    console.log(this.formUpdateRepartidor);
    console.log(this.formEmail); */

    this.isUpdate = true;
  }

  actualizarRepartidor(){
    if(this.formUpdateRepartidor.valid){
      let dataU = {
        name: this.formUpdateRepartidor.value.name,
        last_name: this.formUpdateRepartidor.value.last_name,
        cedula: this.formUpdateRepartidor.value.cedula,
        direccion: this.formUpdateRepartidor.value.direccion,
        referencia: this.formUpdateRepartidor.value.referencia,
        telefono: this.formUpdateRepartidor.value.telefono,
      }
      this.repartidorS.actualizarUsuario(dataU, this.idForUpdate).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    this.idForUpdate = 0;
    this.isUpdate = false;
    this.getAllRepartidores();
  }



  editarEmail(formE:any){
    if(this.formEmail.valid){
      this.perfilS.editUserEmail(formE, this.idForUpdate).subscribe({
        next: (res) => (console.log(res)),
        error: (err) => (console.log(err))
      });
      this.getAllRepartidores();
      this.isUpdate = false;
      this.idForUpdate = 0;
    }else{
      this.formEmail.markAllAsTouched();
    }
  }

  editarPassword(formP:any){
    if(this.formPassword.valid){
      this.perfilS.editPassword(formP, this.idForUpdate).subscribe({
        next: (res) => (console.log(res)),
        error: (err) => (console.log(err))
      });
      this.getAllRepartidores();
      this.isUpdate = false;
      this.idForUpdate = 0;
    }else{
      this.formPassword.markAllAsTouched();
    }
  }

}
