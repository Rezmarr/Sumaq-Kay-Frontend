import { AbstractControl, FormGroup } from '@angular/forms';
import { FormUtil } from '../utils/form.util';

export abstract class FormWrapper<
  IRequest = any,
  IForm extends {
    [K in keyof IForm]: AbstractControl<any>;
  } = any
> {
  public formulario!: FormGroup<IForm>;

  public enviandoFormulario: boolean;
  public hasErrorFromAPI: boolean;
  public errorMessageFromAPI?: string;
  public submitted: boolean;

  private controlsADeshabilitar: AbstractControl<any, any>[];

  constructor() {
    this.submitted = false;
    this.enviandoFormulario = false;
    this.hasErrorFromAPI = false;
    this.controlsADeshabilitar = [];
    this.inicializarFormulario();
    this.deshabilitarCampos();
  }

  public abstract toRequest(): Promise<IRequest>;
  protected abstract inicializarFormulario(): void;
  protected abstract extraValidation(): boolean;
  protected abstract deshabilitarCampos(): void;

  public getErrorMessage(atributo: string, etiqueta?: string): string {
    if (!this.submitted) return '';

    return FormUtil.getErrorMessage(
      this.formulario.get(atributo)!,
      etiqueta ?? atributo
    );
  }

  public getValidateStatus(atributo: string): 'success' | 'error' {
    return this.getErrorMessage(atributo) === '' ? 'success' : 'error';
  }

  public markAsError(atributo: string, error?: string) {
    FormUtil.markAsError(this.formulario.get(atributo)!);
    this.hasErrorFromAPI =
      error !== null && error !== undefined && error !== '';
    this.errorMessageFromAPI = error;
  }

  public validate(): boolean {
    this.submitted = true;

    return !FormUtil.isInvalidForm(this.formulario) && this.extraValidation();
  }

  public deshabilitar(): void {
    this.enviandoFormulario = true;
    this.hasErrorFromAPI = false;
    this.errorMessageFromAPI = undefined;
    this.controlsADeshabilitar = [
      ...FormUtil.getInputsToDisable(this.formulario),
    ];
    this.controlsADeshabilitar.forEach((e) => e.disable({ emitEvent: false }));
  }

  public habilitar(): void {
    this.enviandoFormulario = false;
    this.controlsADeshabilitar.forEach((e) => e.enable({ emitEvent: false }));
    this.controlsADeshabilitar = [];
  }

  public resetear(): void {
    this.submitted = false;
    this.enviandoFormulario = false;
    this.hasErrorFromAPI = false;
    this.errorMessageFromAPI = undefined;
    FormUtil.reset(this.formulario);
    this.deshabilitarCampos();
  }
}
