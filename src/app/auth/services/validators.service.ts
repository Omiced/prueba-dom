import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isValidCaptcha(captchaResponse: string): boolean {
    return captchaResponse && captchaResponse.length > 0 ? true : false;
  }
  public isFieldEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const value1 = formGroup.get(fieldOne)?.value;
      const value2 = formGroup.get(fieldTwo)?.value;

      if (value1 !== value2) {
        formGroup.get(fieldTwo)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(fieldTwo)?.setErrors(null);

      return null;
    };
  }

  public checkUser(field: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const username = formGroup.get(field)?.value;
      if (localStorage.getItem(username)) {
        formGroup.get(field)?.setErrors({ exists: true });
        return { exists: true };
      }
      formGroup.get(field)?.setErrors(null);
      return null;
    };
  }
}
