export interface IngresoProducto {
   
    id: number;
    nombre: string;
    precio: string;
    peso: string;
    stock: string;
    imagen: string | File;
    id_categoria: string;
    id_marca: string;
    id_tipo_peso: string;
}
