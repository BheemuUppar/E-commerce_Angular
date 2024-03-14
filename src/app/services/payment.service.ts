import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
declare var Razorpay: any;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private rzp: any;
   paymentStatusSubject = new BehaviorSubject<any>({status:undefined, orderDetails:undefined});
  constructor(private http: HttpClient) {}
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
      // this.rzp.on('payment.success', (response: any) => {
      //   console.log('in success block');
      //   this.paymentStatusSubject.next('success');
      // });
      // this.rzp.on('payment.error', (response: any) => {
      //   this.paymentStatusSubject.next('error');
      // });
    } else {
      console.error('Razorpay is not initialized. Call initialize() first.');
    }
  }

  createOrder(orderDetails: any): Observable<any> {
    // Call your Node.js server to create an order
    return this.http.post(
      'http://localhost:3000/payment/createOrder',
      orderDetails
    );
  }

  verifyPayment(data: any) {
    return this.http.post('http://localhost:3000/payment/verify', data);
  }
}
