import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export namespace FormUtil {
  export function reset<
    TControl extends {
      [K in keyof TControl]: AbstractControl<any, any>;
    } = any
  >(formulario: FormGroup<TControl>): void {
    Object.values(formulario.controls).forEach((control) => {
      if (control instanceof FormArray) {
        control.clear({ emitEvent: false });
      }
      if (control instanceof FormGroup) {
        reset(control);
      }
      if (control instanceof FormControl) {
        control.reset();
      }
    });
  }

  export function isInvalidForm<
    TControl extends {
      [K in keyof TControl]: AbstractControl<any, any>;
    } = any
  >(formulario: FormGroup<TControl>): boolean {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach((control) => {
        if (control instanceof FormArray) {
          control.controls.forEach((fg) => {
            if (fg instanceof FormGroup) {
              isInvalidForm(fg);
              return;
            }

            if (fg.invalid) {
              fg.markAsDirty();
              fg.updateValueAndValidity({ onlySelf: true });
            }
          });
          return;
        }

        if (control instanceof FormGroup) {
          isInvalidForm(control);
          return;
        }

        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return true;
    }

    return false;
  }

  export function getInputsToDisable<
    TControl extends {
      [K in keyof TControl]: AbstractControl<any, any>;
    } = any
  >(formulario: FormGroup<TControl>): AbstractControl<any, any>[] {
    const controls: AbstractControl<any, any>[] = [];

    for (const c of Object.values(formulario.controls ?? {})) {
      if (c instanceof FormArray) {
        for (const fg of c.controls) {
          if (fg instanceof FormGroup)
            controls.push(...getInputsToDisable(fg as FormGroup));
          if (fg instanceof FormControl) if (fg.enabled) controls.push(fg);
        }
        continue;
      }

      if (c instanceof FormGroup) {
        controls.push(...getInputsToDisable(c));
        continue;
      }

      if (c.enabled) {
        controls.push(c);
      }
    }

    return controls;
  }

  export function getErrorMessage(
    FC: AbstractControl,
    etiqueta: string
  ): string {
    if (!FC.errors) return '';

    if (FC.errors['required']) return 'El campo es requerido';

    if (FC.errors['minlength'])
      return `Debe ingresar mínimo ${FC.errors['minlength']['requiredLength']} caracteres`;

    if (FC.errors['maxlength'])
      return `Máximo puede ingresar ${FC.errors['maxlength']['requiredLength']} caracteres`;

    if (FC.errors['email'])
      return `El campo ${etiqueta} debe ser correo electrónico`;

    if (FC.errors['pattern'])
      return `El campo ${etiqueta} no cumple con el patrón`;

    return 'El campo no es válido';
  }

  export function markAsError(FC: AbstractControl): void {
    FC.markAsDirty();
    FC.updateValueAndValidity({ onlySelf: true });
  }

  export function getValidateStatus(FC: AbstractControl): 'success' | 'error' {
    return getErrorMessage(FC, '') === '' ? 'success' : 'error';
  }

  export function isValidControl(FC: AbstractControl): boolean {
    const status = getValidateStatus(FC);

    if (status === 'error') {
      markAsError(FC);
    }

    return status === 'success';
  }
}
