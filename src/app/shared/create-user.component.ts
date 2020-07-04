import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'dash-create-user',
  template: `
    <div class="wrapper">
      <div class="form">
        <div class="field-line">
          <label class="field">Full Name:</label>
          <input #fullNameInput nbInput type="text" placeholder="Full Name"/>
        </div>
        <div class="field-line">
          <label class="field">E-mail:</label>
          <input #emailInput nbInput type="email" placeholder="E-mail"/>
        </div>
        <div class="field-line">
          <label class="field">Password:</label>
          <input #passwordInput nbInput type="password" placeholder="Password"/>
        </div>
      </div>
      <div class="bottom-menu">
        <label class="error" *ngIf="error">{{error}}</label>
        <button nbButton (click)="confirm()" status="primary">Add</button>
      </div>
    </div>
  `,
  styles: [`
    .wrapper, .form {
      display: flex;
      flex-direction: column;
    }
    :host {
      min-width: 500px;
      width: 500px;
      display: inline-block;
    }
    .field-line {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    input {
      min-width: 70%;
    }
    .bottom-menu {
      margin-top: 10px;
      text-align: right;
    }
  `]
})
export class CreateUserComponent {

  public error: string = undefined;
  @ViewChild('fullNameInput') fullNameInput: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService, private windowRef: NbWindowRef) {}

  validate(data: {email: string, password: string, fullname: string}): boolean {
    this.error = undefined;
    if (!(data.email.length >= 3 && data.email.includes('@') && data.email.includes('.'))) {
      this.error = 'The email is invalid.';
      return false;
    }
    if (data.password.length < 6) {
      this.error = 'The password is too short (Min. 6 Characters)';
      return false;
    }
    if (data.fullname.length <= 0) {
      this.error = 'The fullname is required';
      return false;
    }
    return true;
  }

  async addUser(data: {email: string, password: string, fullname: string}): Promise<boolean> {
    try {
      await this.authService.addUser({
        email: data.email,
        emailVerified: false,
        password: data.password,
        displayName: data.fullname,
        disabled: false,
      });
      return true;
    } catch (err) {
      this.error = err;
      return false;
    }
  }

  async confirm(): Promise<void> {
    const data = {
      email: this.emailInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
      fullname: this.fullNameInput.nativeElement.value,
    }
    if (!this.validate(data)) {
      return;
    }
    if (!(await this.addUser(data))) {
      return;
    }
    this.windowRef.close();
  }

}
