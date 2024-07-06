import { TipoRepuestaEnum } from '../enums/tipo-respuesta.enum';

export interface ResponseAPI<T = {}> {
  tipoRespuesta?: TipoRepuestaEnum;
  title?: string;
  message: string;
  data?: T;
}
