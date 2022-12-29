import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.css']
})
export class VerVentasComponent implements OnInit {
  ordens:any
  pageE:number=0
  constructor(
    private orden:VentasService
  ) { }

  ngOnInit(): void {
     this.showVenta()
  }

  showVenta(){
    this.orden.ShowVenta().subscribe({
      next:(res)=>{
        this.ordens=res
/*         this.entregas=this.ordens[0].entregas; */
        console.log(this.ordens);
        //debugger
      }
    })
  }
  nextPage_entregas(){
    this.pageE+=2
  }

  previousPage_entregas(){
    if(this.pageE>0)
    this.pageE-=2
  }

}
