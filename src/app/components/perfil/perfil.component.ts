import { PerfilService } from './../../servicios/perfil.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id:any;
  usuario!:any;

  constructor(private perfilS: PerfilService) { }

  ngOnInit(): void {

    this.id = localStorage.getItem('id');
    console.log(this.id);
    this.getPerfil(this.id);

  }

  getPerfil(_id:any){

    this.perfilS.getPerfil(_id).subscribe({
      next: (res) => {
        console.log(res);
        this.usuario = res;
        
      },
      error(err) {
        console.error(err);
      },
    });

  }

}
