import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-show-payment-status',
  templateUrl: './show-payment-status.component.html',
  styleUrls: ['./show-payment-status.component.css'],
})
export class ShowPaymentStatusComponent implements OnInit {
  statusMessage = undefined;
orderDetails = undefined
  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
    
}
