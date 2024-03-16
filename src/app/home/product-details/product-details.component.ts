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
  isExistInCart: boolean = false;
  isExistInWishlist: boolean = false;
  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.actRoute.queryParams.subscribe((params) => {
      this.product = JSON.parse(params['product']);
      this.cartAndWishlistStatus();
    });
  }

  addToCart(id: string) {
    this.userService.addTocart(id).subscribe(
      (res) => {
        alert('item added to cart');
        this.cartAndWishlistStatus();
        this.router.navigateByUrl('/cart');
      },
      (err: any) => {
        alert('Product Already Exist In Your Cart');
      }
    );
  }
  addToWishlist(id: any) {
    this.userService.addToWishlist(id).subscribe(
      (res: any) => {
        alert(res.message);
        this.cartAndWishlistStatus();
      },
      (err) => {}
    );
  }

  cartAndWishlistStatus() {
    this.userService
      .existInCartAndWishlist(this.product._id)
      .subscribe((res: any) => {
        this.isExistInCart = res.isExistInCart;
        this.isExistInWishlist = res.isExistInWishlist;
      });
  }

  removeFromCart(id: string) {
    this.userService.removeFromCart(id).subscribe((res:any) => {
      alert(res.message);
      this.cartAndWishlistStatus()
    });
  }
}
