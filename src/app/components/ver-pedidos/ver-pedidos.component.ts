import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {
  ordens:any
  entregados:any
  en_curso:any
  por_entregar:any
  pageE:number=0
  pageC:number=0
  pageP:number=0
  constructor(
    private orden:PedidosService
  ) { }

  ngOnInit(): void {
    this.showOrden()
  }
    

  showOrden(){
    this.orden.showOrdenEstado().subscribe({
      next:(res)=>{
        this.ordens=res
        this.entregados=this.ordens[0].entregados;
        this.en_curso=this.ordens[0].en_curso;
        this.por_entregar=this.ordens[0].por_entregar;
       // console.log(this.ordens);
        console.log(this.en_curso);
        console.log(this.por_entregar);
        console.log(this.entregados);
        //debugger
      }
    })
  }

  nextPage_entregados(){
    this.pageE+=2
  }

  previousPage_entregados(){
    if(this.pageE>0)
    this.pageE-=2
  }
  nextPage_Encurso(){
    this.pageC+=2
  }

  previousPage_Encurso(){
    if(this.pageC>0)
    this.pageC-=2
  }
  nextPage_Porentregar(){
    this.pageP+=2
  }

  previousPage_Porentregar(){
    if(this.pageP>0)
    this.pageP-=2
  }
}
