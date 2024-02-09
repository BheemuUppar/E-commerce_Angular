import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  data: any;
  orderDetails: any;
  constructor(
    private actRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private storageService: StorageService
  ) {
    this.actRoute.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['product']);
    });
    this.paymentService.paymentStatus$.subscribe((res:any)=>{
      if(res == 'success'){
        alert('payment success verifying...');
      }
    })
  }

  getTotalPrice() {
    let price = 0;
    for (let product of this.data.selectedProducts) {
      price += Number(this.calculatePrice(product.price, product.quantity));
    }
    return Math.round(price);
  }
  calculatePrice(price: any, quantity: number) {
    return (price * quantity).toFixed(2);
  }

  order() {
    let str = localStorage.getItem('user');
    // if (str) {
    this.orderDetails = this.getOrderDetails();
    // this.userService.fetchUserDetails(str).subscribe(async (res: any) => {
    //   console.log(res.data);
    //   let profile = {
    //     name: res.data.name,
    //     email: res.data.email,
    //     mobile: res.data.mobile,
    //   };
    //   this.orderDetails = await this.getOrderDetails(profile);
    //   this.orderDetails.amount = this.orderDetails.amount * 100;
    //   this.orderDetails.paymentMode = 'online'
    //   // console.log(this.product)
    //   // console.log(orderDetails)
    this.paymentService.createOrder(this.orderDetails).subscribe((response) => {
      try {
        this.orderDetails = response.orderDetails;
        console.log(response);
        let options = {
          key: 'rzp_test_GUCLqEesz1MaZA', // Enter the Key ID generated from the Dashboard
          amount: response.orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'E-shop', //your business name
          description: 'Test Transaction',
          // "image": "https://example.com/your_logo",
          order_id: response.orderDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
          handler: (response: any) => this.handlePaymentResponse(response),
          prefill: this.orderDetails.profile,
          notes: {
            address: this.orderDetails.address,
          },
          theme: {
            color: '#3399cc',
          },
        };
        // var rzp1 = new Razorpay(options);
        //     rzp1.open();
        this.paymentService.initialize(options);
        this.paymentService.open();
      } catch (error) {
        console.log('ERRRROORRRRR', error);
      }
    });
    // });
    // }
  }

  handlePaymentResponse(response: any): void {
    // console.log('Payment successful:', response);
    // console.log('order-details ', this )
    this.paymentService.paymentStatusSubject.next('success')
    let obj = { ...response, ...this.orderDetails };
    console.log('after success  ', obj);
    this.verifyPayment(obj);
    // Add logic to update order status on the server
  }
  verifyPayment(data: any) {
    this.paymentService.verifyPayment(data).subscribe((res:any) => {
      console.log(res);
      if(res.message == 'payment is successful'){

      }
    });
  }

  getOrderDetails() {
    // return {
    //   amount: this.getTotalPrice(),
    //   productId: this.product._id,
    //   productName: this.product.name,
    //   quantity: this.quantity,
    //   profile: user,
    //   deliveryAddress: 'banglore',
    // };
    let name = this.storageService.getJsonValue('username');
    let email = this.storageService.getJsonValue('email');
    let mobile = this.storageService.getJsonValue('mobile');
    let profile = {
      name: name,
      email: email,
      mobile: mobile,
    };
    return {
      amount: this.getTotalPrice(),
      products: this.getProductsDetails(),
      profile: profile,
      deliveryAddress: 'banglore',
    };
  }

  getProductsDetails() {
    let result = [];
    for (let product of this.data.selectedProducts) {
      let temp: any = {};
      temp.productId = product._id;
      temp.productName = product.name;
      temp.quantity = product.quantity;
      result.push(temp);
    }
    return result;
  }
}
