import { UsuarioService } from './../../servicios/usuario.service';
import { ResRespartidorInterface } from './../../interfaces/resRepartidorInterface';
import { repartidorInterface } from './../../interfaces/repartidorInterface';
import { PerfilService } from './../../servicios/perfil.service';
import { Component, OnInit } from '@angular/core';
import { RepartidorService } from './../../servicios/repartidor.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: ResRespartidorInterface[] = [];

  isAdd:boolean = false;
  isUpdate:boolean = false;

  public formUsuario!: FormGroup;
  public formUpdateUsuario!: FormGroup;
  public formEmail!:FormGroup;
  public formPassword!:FormGroup;

  idForUpdate:number = 0;

  file: File | any;
  fileSelect: any;

  url: string = "http://127.0.0.1:8000/storage/images/repartidor/"; //esto no se está usando
  
  constructor(private repartidorS: RepartidorService,
    private perfilS: PerfilService,
    private usuarioS: UsuarioService, 
    private formBuilder: FormBuilder) 
{

this.formUsuario=this.formBuilder.group({
name: ['',[Validators.required]],
last_name:['',[Validators.required]],
email:['',[Validators.required]],
password:['',[Validators.required]],
cedula:['',[Validators.required]],
direccion:['',[Validators.required]],
referencia:['',[Validators.required]],
imagen:['',[Validators.required]],
telefono:['',[Validators.required]],
});

this.formUpdateUsuario=this.formBuilder.group({
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

    this.getAllUsuarios();

  }

  getAllUsuarios(){
    this.usuarioS.getAllUsuarios().subscribe({
      next: (res) => {
        console.log(res);
        this.usuarios = res;
      }, 
      error: (err) => {
        console.error(err);
      }
    });
  }

  agregarUsuario(){
    this.isAdd = true;
  }

  regresar(){
    this.isAdd = false;
    this.isUpdate = false;
  }

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  storeUsuario(){

    /* console.log(this.formUsuario, this.file); */

    if(this.file){
      this.formUsuario.controls['imagen'].setValue(this.file.name);

      let data:repartidorInterface = {
        name: this.formUsuario.value.name,
        last_name: this.formUsuario.value.last_name,
        email: this.formUsuario.value.email,
        password: this.formUsuario.value.password,
        cedula: this.formUsuario.value.cedula,
        direccion: this.formUsuario.value.direccion,
        referencia: this.formUsuario.value.referencia,
        telefono: this.formUsuario.value.telefono,
        imagen: this.file,
      }

      if(this.formUsuario.valid){
        this.usuarioS.registroUsuario(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          }
        });
        this.getAllUsuarios();
        this.isAdd = false;
      } else {
        this.formUsuario.markAllAsTouched();
      }

    } else {
      console.error("La imagen es requerida.");
    }
  }


  deleteUsuario(id:any){
    this.repartidorS.eliminarUsuario(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.getAllUsuarios();
  }


  editUsuario(id:number){

    this.idForUpdate = id; 
    
    let repartidor = this.usuarios.find(e => e.id == id);

    if(repartidor){
      //datos normales
      this.formUpdateUsuario.controls['name'].setValue(repartidor?.name);
      this.formUpdateUsuario.controls['last_name'].setValue(repartidor?.last_name);
      this.formUpdateUsuario.controls['cedula'].setValue(repartidor?.cedula);
      this.formUpdateUsuario.controls['direccion'].setValue(repartidor?.direccion);
      this.formUpdateUsuario.controls['referencia'].setValue(repartidor?.referencia);
      this.formUpdateUsuario.controls['telefono'].setValue(repartidor?.telefono);

      //email
      this.formEmail.controls['email'].setValue(repartidor?.email);

    }

    /* console.log(repartidor);
    console.log(this.formUpdateUsuario);
    console.log(this.formEmail); */

    this.isUpdate = true;
  }

  actualizarUsuario(){
    if(this.formUpdateUsuario.valid){
      let dataU = {
        name: this.formUpdateUsuario.value.name,
        last_name: this.formUpdateUsuario.value.last_name,
        cedula: this.formUpdateUsuario.value.cedula,
        direccion: this.formUpdateUsuario.value.direccion,
        referencia: this.formUpdateUsuario.value.referencia,
        telefono: this.formUpdateUsuario.value.telefono,
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
    this.getAllUsuarios();
  }



  editarEmail(formE:any){
    if(this.formEmail.valid){
      this.perfilS.editUserEmail(formE, this.idForUpdate).subscribe({
        next: (res) => (console.log(res)),
        error: (err) => (console.log(err))
      });
      this.getAllUsuarios();
      this.isUpdate = false;
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
      this.getAllUsuarios();
      this.isUpdate = false;
    }else{
      this.formPassword.markAllAsTouched();
    }
  }

}
