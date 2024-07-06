import { Injectable, Injector } from "@angular/core";
import { APIService } from "../api/api.service";
import { SERVICES } from "src/environments/services/services";
import { ResponseAPI } from "src/app/core/interfaces/response-api.interface";
import { RoutesUtil } from "src/app/core/utils/route.util";
import { ROUTES_URL } from "src/app/core/constants/routes.constant";

interface Recomendacion {
    readonly nombre: string;
    readonly precio: number;
    readonly fotoUrl: string;
    readonly urlDetalle: string;
}

interface chatMessage {
    readonly mensaje: string;
    readonly tipo: 'usuario' | 'bot';
    readonly recomendaciones?: Recomendacion[];
}

@Injectable({
    providedIn: 'root',
})
export class ChatBot extends APIService {

    private _mensajes: chatMessage[] = [];
    private estaEscribiendo = false;

    constructor(injector: Injector) {
        super(injector, SERVICES.apiGateway.url, 'recomendaciones');
    }

    public get mensajes(): chatMessage[] {
        return [...this._mensajes];
    }

    public get estaEscribiendoMensaje(): boolean {
        return this.estaEscribiendo;
    }

    public iniciarChat(): void {
        const mensaje = 'Hola';
        this.enviarMensajeBot(mensaje);
    }

    public enviarMensaje(mensaje: string): void {
        this.agregarMensaje({ mensaje, tipo: 'usuario' });
        this.enviarMensajeBot(mensaje);
    }

    private agregarMensaje(mensaje: chatMessage): void {
        this._mensajes.push(mensaje);
    }

    public limpiarChat(): void {
        this._mensajes = [];
    }

    private enviarMensajeBot(mensaje: string): void {
        this.estaEscribiendo = true;
        this.post<ResponseAPI<any>, { mensaje: string }>({
            url: '/',
            request: { mensaje },
        }).then((res) => {

            const recomendaciones: Recomendacion[] = res.data!.recomendaciones.map((recomendacion: any) => {
                return {
                    nombre: recomendacion.nombre,
                    precio: recomendacion.precio,
                    fotoUrl: recomendacion.fotoUrl,
                    urlDetalle: RoutesUtil.procesarURL({ url: ROUTES_URL.productos.detalle, params: [recomendacion.publicKey] }),
                };
            });

            const mensajeObject: chatMessage = {
                mensaje: res.data!.respuesta,
                tipo: 'bot',
                recomendaciones,
            };
            this.agregarMensaje(mensajeObject);
        }).finally(() => {
            this.estaEscribiendo = false;
        });
    }

}