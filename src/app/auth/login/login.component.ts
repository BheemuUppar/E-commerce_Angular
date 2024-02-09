import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup<any>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService:StorageService
  ) {
    this.loginForm = this.fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required]),
    });
  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.doLogin(email, password).subscribe((res: any) => {
      if (res.success == true) {
        this.storageService.setJsonValue('token', res.token)
        this.getUserData(email);
        this.router.navigateByUrl('/');
      }
    });
  }

  getUserData(email: string) {
    this.authService.fetchUserData(email).subscribe((response:any) => {
      this.storageService.setJsonValue('username', response.data.name);
      this.storageService.setJsonValue('email', response.data.email);
      this.storageService.setJsonValue('mobile', response.data.mobile);
      console.log(response);
    });
  }
}
