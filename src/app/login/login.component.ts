import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.hasToken()) {
      this.handleLoginSuccess();
    } else {
      this.initForm();
    }
  }

  loginForm: FormGroup;
  error: Boolean = false;
  checkField = this.CheckRequiredField;
  processing: Boolean = false;

  private login() {
    this.processing = true;
    this.authService.login(this.loginForm.value).then(
      data => {
        if (data) {
          this.handleLoginSuccess();
        } else {
          this.handleLoginError();
        }
      },
      err => {
        console.log('---- ERROR ---- ');
        console.log(err);
        this.handleLoginError();
      });
  }

  private handleLoginSuccess() {
    this.processing = false;
    this.error = false;
    this.router.navigate(['/home']);
  }

  private handleLoginError() {
    this.processing = false;
    this.error = true;
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  private CheckRequiredField(field: AbstractControl): boolean {
    return (!field.valid && (field.dirty || field.touched));
  }

  onSubmitButtonClicked() {
    this.error = false;
    this.processing = false;
    if (this.loginForm.valid) {
      this.login();
    }
  }

}