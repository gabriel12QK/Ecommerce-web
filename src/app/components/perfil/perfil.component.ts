import { PerfilService } from './../../servicios/perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id:any;
  usuario!:any;
  isEdited:boolean = true;

  public formEmail!:FormGroup;
  public formPassword!:FormGroup;

  constructor(
    private perfilS: PerfilService,
    private formBuilder: FormBuilder
    ) 
  {
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.formPassword= this.formBuilder.group({
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {

    this.id = localStorage.getItem('id');
    console.log(this.id);
    this.getPerfil(this.id);

  }

  getPerfil(_id:any){

    this.perfilS.getPerfil(_id).subscribe({
      next: (res) => {
        /* console.log(res); */
        this.usuario = res;
        
      },
      error(err) {
        console.error(err);
      },
    });

  }

  editarPerfil(){
    /* console.log("Editar perfil."); */
    this.isEdited = false;
  }

  editarEmail(formE:any){
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
  }

  regresar(){
    this.isEdited = true;
  }

}
