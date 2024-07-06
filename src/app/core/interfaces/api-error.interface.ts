import { TipoAlertaEnum } from '../enums/tipo-alerta.enum';

export interface APIError {
  tipoAlerta: TipoAlertaEnum;
  titulo?: string;
  descripcion?: string;
}
