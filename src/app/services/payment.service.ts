import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'src/assets/environment';
declare var Razorpay: any;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private rzp: any;
   paymentStatusSubject = new BehaviorSubject<any>({status:undefined, orderDetails:undefined});
  constructor(private http: HttpClient, private storageService:StorageService) {}
  paymentStatus$ = this.paymentStatusSubject.asObservable();

  initialize(options: any): void {
    this.rzp = new Razorpay(options);
  }

  open(): void {
    if (this.rzp) {
      this.rzp.open();
      this.rzp.on('payment.failed', function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      
    } else {
      console.error('Razorpay is not initialized. Call initialize() first.');
    }
  }

  createOrder(orderDetails: any): Observable<any> {
    
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token')
    };
    return this.http.post(
      environment.createOrder,
      orderDetails, {headers}
    );
  }

  verifyPayment(data: any) {
    // let payload = {
    //   data:data,
    // }
    let headers = {
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token')
    };
    return this.http.post(environment.paymentVerify, data,{headers} );
  }
}
