import { Component } from '@angular/core';
import { LoginForm } from './login.form';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { Router } from '@angular/router';
import { RootProvider } from 'src/app/core/controllers/providers/root/root.provider';
import { APIError } from 'src/app/core/interfaces/api-error.interface';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';
import { TipoAlertaEnum } from 'src/app/core/enums/tipo-alerta.enum';
import { ErrorUtil } from 'src/app/core/utils/error.util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public fw = new LoginForm();
  public loginError?: APIError;
  public RoutesType = ROUTES_URL;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly rootProvider: RootProvider
  ) {}

  async onSubmit(): Promise<void> {
    if (this.fw.enviandoFormulario || !this.fw.validate()) return;

    try {
      this.loginError = undefined;
      this.fw.deshabilitar();
      
      const loginRequest = await this.fw.toRequest();
      // loginRequest.password = EncryptUtil.encryptBase64(
      //   loginRequest.password,
      //   'asdqwezxc'
      // )!;

      await this.authService.login(loginRequest);

      this.router.navigateByUrl(ROUTES_URL.inicio);

    } catch (error) {
      this.fw.hasErrorFromAPI = true;
      this.fw.errorMessageFromAPI = ErrorUtil.getApiErrorMessage(error);
      this.loginError = {
        tipoAlerta: TipoAlertaEnum.Error,
        descripcion: this.fw.errorMessageFromAPI,
      };
    } finally {
      this.fw.habilitar();
    }
  }
}
