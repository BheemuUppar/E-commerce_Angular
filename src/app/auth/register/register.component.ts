import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
signUpForm : FormGroup;
passwordMatchError : boolean = false
constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){
  this.signUpForm = this.fb.group({
    name: fb.control('', [Validators.required]),
    email: fb.control('', [Validators.required, Validators.email]),
    mobile: fb.control('', [Validators.required]),
    password: fb.control('', [Validators.required]),
    cnf_password: fb.control('', [Validators.required,this.passwordMatchValidator('password')]),
  });
   // Add the custom validator after creating the form
  //  this.signUpForm.get('cnf_password')?.setValidators(this.passwordMatchValidator('password'));
  //  this.signUpForm.get('cnf_password')?.updateValueAndValidity();
}

register(){
  let user = this.signUpForm.value;
  delete user.cnf_password;

  this.authService.registerUser(user).subscribe((res)=>{
    alert("User registered, please login to Explore")
  })
   
}
passwordMatchValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordControl = control.root.get(controlName);

    if (passwordControl && control.value !== passwordControl.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };
}
}
