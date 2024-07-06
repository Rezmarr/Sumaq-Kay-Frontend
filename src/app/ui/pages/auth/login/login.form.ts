import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormWrapper } from 'src/app/core/classes/form-wrapper.class';
import { LoginRequest } from 'src/app/core/controllers/services/auth/dto/login.dto';

export class LoginForm extends FormWrapper<
  LoginRequest,
  {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }
> {
  public async toRequest(): Promise<LoginRequest> {
    const f = this.formulario.getRawValue();

    return {
      email: f.email!,
      password: f.password!,
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
    });
  }

  protected extraValidation(): boolean {
    return true;
  }

  protected deshabilitarCampos(): void {}
}
