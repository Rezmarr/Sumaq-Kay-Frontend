export interface Producto {
    readonly nombre: string;
    readonly descripcion: string;
    readonly precio: number;
    readonly stock: number;
    readonly activo: boolean;
    readonly fotoUrl: string;
    readonly publicKey: string;
    readonly _id: string;
}