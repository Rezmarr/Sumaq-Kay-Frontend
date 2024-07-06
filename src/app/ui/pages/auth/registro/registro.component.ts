import { Component, OnInit } from '@angular/core';
import { APIError } from 'src/app/core/interfaces/api-error.interface';
import { RegistroForm } from './registro.form';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { Router } from '@angular/router';
import { RootProvider } from 'src/app/core/controllers/providers/root/root.provider';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { TipoAlertaEnum } from 'src/app/core/enums/tipo-alerta.enum';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public fw = new RegistroForm();
  public registerError?: APIError;
  public RoutesType = ROUTES_URL;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly rootProvider: RootProvider
  ) { }

  ngOnInit(): void {
    this.fw.formulario.controls.rol.setValue('Cliente');
  }

  async onSubmit(): Promise<void> {
    if (this.fw.enviandoFormulario || !this.fw.validate()) return;

    try {
      this.registerError = undefined;
      this.fw.deshabilitar();

      const registroRequest = await this.fw.toRequest();

      await this.authService.registro(registroRequest);

      await this.authService.login({
        email: registroRequest.email,
        password: registroRequest.password,
      });

      this.router.navigateByUrl(ROUTES_URL.inicio);

    } catch (error) {
      this.fw.hasErrorFromAPI = true;
      this.fw.errorMessageFromAPI = ErrorUtil.getApiErrorMessage(error);
      this.registerError = {
        tipoAlerta: TipoAlertaEnum.Error,
        descripcion: this.fw.errorMessageFromAPI,
      };
    } finally {
      this.fw.habilitar();
    }
  }
}
