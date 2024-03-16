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
import { UserService } from 'src/app/services/user.service';

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
    private storageService:StorageService,
    private  userService  : UserService  ) {
    this.loginForm = this.fb.group({
      email: fb.control('test@gmail.com', [Validators.required, Validators.email]),
      password: fb.control('Test@123', [Validators.required]),
    });
  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.doLogin(email, password).subscribe(async (res: any) => {
      if (res.success == true) {
        this.storageService.setJsonValue('token', res.token)
        await this.setUserData(email);
        this.userService.auth.next(true)
        this.router.navigateByUrl('list');
      }
    });
  }

  setUserData(email: string):Promise<any> {
    return new Promise((resolve, reject)=>{
      this.authService.fetchUserData(email).subscribe((response:any) => {
        this.storageService.setJsonValue('username', response.data.name);
        this.storageService.setJsonValue('email', response.data.email);
        this.storageService.setJsonValue('mobile', response.data.mobile);
        resolve(response)
      });
    })
  }
}
