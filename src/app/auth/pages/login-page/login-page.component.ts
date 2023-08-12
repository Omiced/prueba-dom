import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { enviroment } from 'src/enviroments/enviroment';
@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  constructor(private formBuilder: FormBuilder) {}
  public siteKey = enviroment.recaptchaSiteKey;

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
