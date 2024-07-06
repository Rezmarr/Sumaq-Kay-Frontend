export interface RegistroRequest {
  readonly email: string;
  readonly password: string;
  readonly nombre: string;
  readonly apellidoPaterno: string;
  readonly apellidoMaterno: string;
  readonly rol: string;
}
