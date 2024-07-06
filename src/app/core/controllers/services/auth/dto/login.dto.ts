export interface LoginRequest {
  email: string;
  password: string;
}

export interface UsuarioInfo {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  token: string;
  id: string;
}

export interface LoginResponse {
  usuario: UsuarioInfo;
}
