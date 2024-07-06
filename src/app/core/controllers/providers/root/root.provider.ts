import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { TipoRepuestaEnum } from 'src/app/core/enums/tipo-respuesta.enum';

export interface IMensaje{
    tipoRespuesta: TipoRepuestaEnum;
    mensaje: string;
    pauseOnHover?: boolean;
    duracion?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RootProvider {
  private $mensajes = new Subject<IMensaje>();
  private $sesion = new Subject<boolean>();

  public mostrarMensaje(data: IMensaje): void {
    this.$mensajes.next(data);
  }

  public escucharMensajes(): Observable<IMensaje> {
    return this.$mensajes.asObservable();
  }

  public enviarCambioSesion(data: boolean): void {
    this.$sesion.next(data);
  }

  public escucharCambioSesion(): Observable<boolean> {
    return this.$sesion.asObservable();
  }


}
