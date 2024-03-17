import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  products:any = []
  constructor(private userService: UserService, private productService:ProductService) {
    this.getWishList();
  }

  getWishList() {
    this.userService.fetchWishlist().subscribe((res: any) => {
      console.log(res.data);
      let arr: any[] = res.data.map((ele: any) => {
        return ele.id;
      });
      this.getProductsById(arr)
    });
  }

  getProductsById(arr: any[]) {
    this.productService.getProductById(arr).subscribe((res:any)=>{
          this.products = res.data;
    })

  }
}
