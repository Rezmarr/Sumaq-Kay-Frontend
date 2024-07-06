import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormWrapper } from 'src/app/core/classes/form-wrapper.class';
import { RegistroRequest } from 'src/app/core/controllers/services/auth/dto/registro.dto';

export class RegistroForm extends FormWrapper<
  RegistroRequest,
  {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    nombre: FormControl<string | null>;
    apellidoPaterno: FormControl<string | null>;
    apellidoMaterno: FormControl<string | null>;
    rol: FormControl<string | null>;
  }
> {
  public async toRequest(): Promise<RegistroRequest> {
    const f = this.formulario.getRawValue();

    return {
      email: f.email!,
      password: f.password!,
      nombre: f.nombre!,
      apellidoPaterno: f.apellidoPaterno!,
      apellidoMaterno: f.apellidoMaterno!,
      rol: f.rol!,
    };
  }

  protected inicializarFormulario(): void {
    this.formulario = new FormGroup({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(75),
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      nombre: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      apellidoPaterno: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      apellidoMaterno: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      rol: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
    });
  }

  protected extraValidation(): boolean {
    return true;
  }

  protected deshabilitarCampos(): void {}
}
