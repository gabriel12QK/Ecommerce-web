export interface ResIngresoProducto {
    id: number;
    nombre: string;
    precio: string;
    peso: string;
    stock: string;
    imagen: string | File;
    id_categoria: string;
    categoria: string;
    id_marca: string;
    marca: string;
    id_tipo_peso: string;
    tipo_peso: string;
}