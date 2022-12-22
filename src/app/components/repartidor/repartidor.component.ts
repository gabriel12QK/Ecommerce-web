import { RepartidorService } from './../../servicios/repartidor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.component.html',
  styleUrls: ['./repartidor.component.css']
})
export class RepartidorComponent implements OnInit {

  repartidores!:any;

  constructor(private repartidorS: RepartidorService) { }

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

}
