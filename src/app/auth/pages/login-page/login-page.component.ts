import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { enviroment } from 'src/enviroments/enviroment';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private customValidators: ValidatorsService
  ) {}

  public siteKey = enviroment.recaptchaSiteKey;

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    recaptcha: new FormControl(null, Validators.required),
  });

  public validCaptcha: boolean = false;
  public isValidField(field: string): boolean | null {
    return this.customValidators.isValidField(this.loginForm, field);
  }

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
  }
  public resolved(captchaResponse: string) {
    this.validCaptcha = this.customValidators.isValidCaptcha(captchaResponse);
  }
}
