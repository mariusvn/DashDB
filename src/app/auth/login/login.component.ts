import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  form: {username: string, password: string} = {username: '', password: ''};
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastrService: NbToastrService) {
    this.loginForm = new FormGroup({
      'email': new FormControl(this.form.username, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.email
      ]),
      'password': new FormControl(this.form.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(user => {
      this.loading = false;
      this.router.navigate(['board', 'home']).then(() => {
        this.toastrService.info('You are connected to DashDB', 'Successfully connected', {
          icon: 'person-done-outline'
        });
      })
    }).catch(err => {
      this.loading = false;
      this.toastrService.danger(err.message, 'An error occurred');
    })
  }

}
