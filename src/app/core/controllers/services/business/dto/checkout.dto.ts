export interface ProductosCheckout {
    readonly cantidad: number;
    readonly precioTotal: number;
    readonly producto: string;
}

export interface CheckoutRequest {
    readonly direccion: string;
    readonly telefono: number;
    readonly productos: ProductosCheckout[];
    readonly envio: number;
    readonly cliente: string;
    readonly fecha: Date;
}