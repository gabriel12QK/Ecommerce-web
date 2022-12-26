import { Component, OnInit } from '@angular/core';
import { PerfilService } from './../../servicios/perfil.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  id:any;
  usuario!:any;

  constructor(private perfilS: PerfilService) { }

  ngOnInit(): void {

    this.id = localStorage.getItem('id');
    console.log(this.id);
    this.getPerfilSidebar(this.id);

  }

  getPerfilSidebar(_id:any){

    this.perfilS.getPerfil(_id).subscribe({
      next: (res) => {
        this.usuario = res;
      },
      error(err) {
        console.log("Error en el componente sidebar al obtener los datos del perfil.");
        console.error(err);
      },
    });

  }

}
