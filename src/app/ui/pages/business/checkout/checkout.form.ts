import { FormControl, Validators, FormGroup } from "@angular/forms";
import { FormWrapper } from "src/app/core/classes/form-wrapper.class";
import { CheckoutRequest, ProductosCheckout } from "src/app/core/controllers/services/business/dto/checkout.dto";


export class CheckoutForm extends FormWrapper<
  CheckoutRequest,
  {
    direccion: FormControl<string | null>;
    telefono: FormControl<number | null>;
    productos: FormControl<ProductosCheckout[] | null>;
    envio: FormControl<number | null>;
    cliente: FormControl<string | null>;
    fecha: FormControl<Date | null>;
  }
> {
  public async toRequest(): Promise<CheckoutRequest> {
    const f = this.formulario.getRawValue();

    return {
      direccion: f.direccion!,
      telefono: f.telefono!,
      productos: f.productos!,
      envio: f.envio!,
      cliente: f.cliente!,
      fecha: f.fecha!,
    };
  }

  protected inicializarFormulario(): void {
    this.formulario = new FormGroup({
      direccion: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      telefono: new FormControl<number | null>(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(9),
      ]),
      productos: new FormControl<ProductosCheckout[] | null>(null, [
        Validators.required,
      ]),
      envio: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      cliente: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      fecha: new FormControl<Date | null>(null, [
        Validators.required
      ]),
    });
  }

  protected extraValidation(): boolean {
    return true;
  }

  protected deshabilitarCampos(): void { }
}
