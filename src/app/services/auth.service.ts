import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

    registerUser(user:any){
      return this.http.post(environment.register, user);
    }

  doLogin(email: string, pwd: string) {
    let payload = {
      email: email,
      password: pwd,
      loginType: 'password',
    };
    return this.http.post(environment.login, payload);
  }

  fetchUserData(email: string) {
    let payload = {
      email: email,
    };
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token')
    };
    return this.http.post(environment.baseUrl + '/user/user', payload, {
      headers: headers,
    });
  }

  verifySession(){
    return this.http.post(environment.tokenVerify,{} )
  }
}
