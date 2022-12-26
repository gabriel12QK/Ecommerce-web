export interface IngresoPromocion {
    id: number;
    stock: number;
    descuento: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: string;
    id_producto:string;
}
