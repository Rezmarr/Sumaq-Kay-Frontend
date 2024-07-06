import { Injectable, Injector } from '@angular/core';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { EncryptUtil } from 'src/app/core/utils/encrypt.util';
import { ENCRYPT_KEYS } from 'src/environments/encrypt-keys/encrypt-keys';
import { NAME_KEYS } from 'src/environments/name-keys/name-keys';
import { SERVICES } from 'src/environments/services/services';
import { APIService } from '../api/api.service';
import {
  LoginRequest,
  LoginResponse,
  UsuarioInfo,
} from './dto/login.dto';
import { RegistroRequest } from './dto/registro.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {
  private _usuario?: UsuarioInfo;

  constructor(injector: Injector) {
    super(injector, SERVICES.apiGateway.url, 'auth');
    this.cargarDatosSesion();
  }

  public get usuario(): UsuarioInfo {
    return { ...this._usuario! };
  }

  public registro(request: RegistroRequest): Promise<ResponseAPI> {
    return this.post<ResponseAPI, RegistroRequest>({
      url: 'registro',
      request,
    });
  }

  public async login(request: LoginRequest): Promise<ResponseAPI> {
    const response = await this.post<ResponseAPI<LoginResponse>, LoginRequest>({
      url: 'login',
      request,
    });

    this.guardarDatosSesion(response.data!);

    return { message: response.message };
  }

  cerrarSesion() {
    this._usuario = undefined;
    localStorage.removeItem(NAME_KEYS.usuario);
    return this.logout();
  }

  private logout(): Promise<ResponseAPI> {
    return this.post<ResponseAPI, {}>({
      url: `logout`,
      request: {},
    });
  }

  public existeSesion(): boolean {
    return this._usuario !== null && this._usuario !== undefined;
  }

  private cargarDatosSesion() {
    this.cargarUsuario();
  }

  private guardarDatosSesion(data: LoginResponse) {
    this._usuario = data.usuario;

    this.guardarUsuario();
  }

  private guardarUsuario(): void {
    localStorage.setItem(
      NAME_KEYS.usuario,
      EncryptUtil.encryptBase64(
        JSON.stringify(this._usuario),
        ENCRYPT_KEYS.usuario
      )!
    );
  }

  private cargarUsuario(): void {
    const userInfoItem = localStorage.getItem(NAME_KEYS.usuario);
    if (!userInfoItem || userInfoItem.trim().length === 0) return;

    const userInfoDecrypted = EncryptUtil.decryptBase64(
      userInfoItem,
      ENCRYPT_KEYS.usuario
    );

    if (!userInfoDecrypted || userInfoDecrypted.trim().length === 0) return;

    this._usuario = JSON.parse(userInfoDecrypted);
  }
}
