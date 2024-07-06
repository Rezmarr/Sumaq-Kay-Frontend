export interface ProductoRecibo {
    readonly nombre: string;
    readonly precio: number;
    readonly fotoUrl: string;
    readonly publicKey: string;
}

export interface ProductosRecibo {
    readonly cantidad: number;
    readonly precioTotal: number;
    readonly producto: ProductoRecibo;
}

export interface Recibo {
    readonly publicKey: string;
    readonly fecha: Date;
    readonly productos: ProductosRecibo[];
    readonly direccion: string;
    readonly telefono: number;
    readonly envio: number;
}