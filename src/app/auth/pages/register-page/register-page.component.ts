import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private customValidators: ValidatorsService,
    private registerService: RegisterService
  ) {}

  public isRegistred?: boolean;

  public registerForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      age: [0, [Validators.required, Validators.min(15)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: [
        this.customValidators.isFieldEqualFieldTwo(
          'password',
          'confirmPassword'
        ),
        this.customValidators.checkUser('username'),
      ],
    }
  );

  public onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    const { username, password } = this.registerForm.value;
    this.isRegistred = this.registerService.newUser(username, password);
  }
  public isValidField(field: string): boolean | null {
    return this.customValidators.isValidField(this.registerForm, field);
  }
}
