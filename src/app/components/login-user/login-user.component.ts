import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {FormBuilder, Validators, AbstractControl, FormGroup} from '@angular/forms';
import { UserMedicInfo } from './../../models/user.medic.info';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: Boolean = false;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSuccess = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onError = new EventEmitter();

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.email.value, this.password.value)
      .subscribe(
        () => {
          this.onSuccess.emit();
          this.form.reset();
        },
        (err) => {
          this.error = true;
          this.onError.emit(err);
        }
      );
    }
  }

  loginVia($event, provider: string) {
    $event.preventDefault();
    this.authService.loginViaProvider(provider).subscribe(
        () => this.onSuccess.emit(),
        err => this.onError.emit(err)
    );
  }

}
