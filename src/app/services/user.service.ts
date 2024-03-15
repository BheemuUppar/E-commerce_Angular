import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/assets/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth = new Subject();
  authSource = this.auth.asObservable();
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  fetchCartList() {
    let url = environment.baseUrl + '/user/cart';
    let payload = {
      email: this.storageService.getJsonValue('email'),
    };
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token'),
    };

    return this.http.post(url, payload, { headers: headers });
  }

  fetchproductsById(arrOfId: any[]) {
    let url = environment.baseUrl + '/getProducts-By-Ids';
    let payload = {
      productIds: arrOfId,
    };
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token'),
    };

    return this.http.post(url, payload, { headers: headers });
  }

  addTocart(id: any) {
    let payload = {
      email: this.storageService.getJsonValue('email'),
      productId: id,
    };

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token'),
    });
    let url = environment.baseUrl + '/user/addToCart';
    return this.http.post(url, payload, { headers: headers });
  }
}
