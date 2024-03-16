import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private storageService:StorageService) { 

  }
  getOrders(email:string){
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token')
    };
    let payload = {email:email}
   return  this.http.post("http://localhost:3000/user/orders",payload, {headers} )
  }

  placeCashOnDeliveryOrder(orderDetails:any){
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token')
    };
    let payload =orderDetails;
    return this.http.post('http://localhost:3000/user/order-cash', payload, {headers})
  }
}
