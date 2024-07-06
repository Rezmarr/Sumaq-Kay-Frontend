import { Injectable } from "@angular/core";
import { EncryptUtil } from "src/app/core/utils/encrypt.util";
import { ENCRYPT_KEYS } from "src/environments/encrypt-keys/encrypt-keys";
import { NAME_KEYS } from "src/environments/name-keys/name-keys";
import { Producto } from "../business/dto/producto.dto";

export interface ProductoCarrito {
    readonly producto: Producto;
    readonly cantidad: number;
    readonly talla: string;
    readonly precioTotal: number;
    readonly publicKey: string;
}

@Injectable({
    providedIn: 'root',
})
export class CarritoService {
    private _carrito: ProductoCarrito[] = [];

    constructor() {
        this.cargarCarrito();
    }

    public get carrito(): ProductoCarrito[] {
        return [...this._carrito];
    }

    public get totalProductos(): number {
        return this._carrito.length;
    }

    public get totalPrecio(): number {
        return this._carrito.reduce((acc, p) => acc + p.precioTotal, 0);
    }

    public agregarProducto(producto: ProductoCarrito) {
        if (this._carrito.some((p) => p.producto.publicKey === producto.producto.publicKey)) {
            this._carrito = this._carrito.map((p) => {
                if (p.producto.publicKey === producto.producto.publicKey) {
                    return { ...p, cantidad: p.cantidad + producto.cantidad, precioTotal: p.precioTotal + producto.precioTotal };
                }
                return p;
            });
        } else {
            this._carrito.push(producto);
        }
        this.guardarCarrito();
    }

    public eliminarProducto(publicKey: string) {
        this._carrito = this._carrito.filter((p) => p.producto.publicKey !== publicKey);
        this.guardarCarrito();
    }

    public vaciarCarrito() {
        this._carrito = [];
        this.guardarCarrito();
    }

    private cargarCarrito() {
        const carrito = localStorage.getItem(NAME_KEYS.carrito);

        if (!carrito || carrito.trim().length === 0) return;

        const carritoDecrypted = EncryptUtil.decryptBase64(carrito, ENCRYPT_KEYS.carrito);

        if (!carritoDecrypted || carritoDecrypted.trim().length === 0) return;

        this._carrito = JSON.parse(carritoDecrypted);
    }

    private guardarCarrito() {
        localStorage.setItem(NAME_KEYS.carrito, EncryptUtil.encryptBase64(JSON.stringify(this._carrito), ENCRYPT_KEYS.carrito)!);
    }
}