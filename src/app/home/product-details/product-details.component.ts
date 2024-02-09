import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: any;
  quantity: number = 1;
  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.actRoute.queryParams.subscribe((params) => {
      this.product = JSON.parse(params['product']);
    });
  }
  // increment() {
  //   this.quantity++;
  // }
  // decrement() {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //   }
  // }

  addToCart(id: string) {
    this.userService.addTocart(id).subscribe((res) => {
      alert('item added to cart ');
      this.router.navigateByUrl('/cart');
    });
  }
}
