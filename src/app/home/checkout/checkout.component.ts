import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';

interface shippingAddress {
  phNo: string;
  name: string;
  buildingName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  data: any;
  orderDetails: any;
  savedOrder: any;
  statusMessage: any;
  address = '';
  paymentMode!: string;
  addressForm!: FormGroup;
  success!: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private router:Router
  ) {
    this.actRoute.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['product']);
    });
  }
  ngOnInit(): void {
    this.addressForm = this.formbuilder.group({
      phNo: ['', Validators.required],
      name: ['', Validators.required],
      buildingName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    });
    
    this.paymentService.paymentStatus$.subscribe((res) => {
      if (res.status != undefined) {
        this.statusMessage = res.status;
        if (res.orderDetails) {
          this.savedOrder = res.orderDetails;
      
        }
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
  }

  openDialog() {
    this.dialog.open(this.myDialog, {
      disableClose:true,
     
    });
  }

  addressDetailes() {
    console.log(this.addressForm.value);
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

  order(paymentMode: string) {
    this.paymentMode = paymentMode;
    let str = localStorage.getItem('user');
    // if (str) {
    this.orderDetails = this.getOrderDetails();
    if (this.paymentMode == 'online') {
      this.onlinePayment();
    } else if (this.paymentMode == 'cash') {
      this.cashPayment();
    }
  }
  onlinePayment() {
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
  }

  cashPayment() {
    
    alert('Delivery confirmed,Thankyou' + this.addressForm.value.name);
  }

  handlePaymentResponse(response: any): void {
    this.paymentService.paymentStatusSubject.next({
      status: 'verifying payment',
      orderDetails: undefined,
    });
   
    let obj = { ...response, ...this.orderDetails };
    console.log('after success  ', obj);
    this.verifyPayment(obj);
    // Add logic to update order status on the server
  }
  @ViewChild('myDialog', { static: true })
  myDialog!: TemplateRef<any>;
  verifyPayment(data: any) {
    this.paymentService.verifyPayment(data).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'payment is successful') {
        this.success = true;
        this.openDialog()
        this.paymentService.paymentStatusSubject.next({
          status: 'successfull',
          orderDetails: res.orderDetails,
        });
      }
    });
  }

  getOrderDetails() {
    let name = this.storageService.getJsonValue('username');
    let email = this.storageService.getJsonValue('email');
    let mobile = this.storageService.getJsonValue('mobile');
    let profile = {
      name: name,
      email: email,
      mobile: mobile,
    };
    return {
      amount: this.getTotalPrice() * 100,
      products: this.getProductsDetails(),
      profile: profile,
      paymentMode: this.paymentMode,
      deliveryAddress: this.addressForm.value,
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

  closeDialog(){
    this.dialog.closeAll();
    this.router.navigateByUrl("/")
  }

}
