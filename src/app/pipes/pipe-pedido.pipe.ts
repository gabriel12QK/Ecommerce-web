import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipePedido'
})
export class PipePedidoPipe implements PipeTransform {

  transform(pedidos:any, page: number=0): any {
   
    return pedidos.slice(page,page+2);
  }

}
