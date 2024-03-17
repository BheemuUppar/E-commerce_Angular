import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewComponent } from '../review/review.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

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
    private router: Router,
    private storageService:StorageService,
    private dialog:MatDialog,
    private productService:ProductService
  ) {
    this.actRoute.queryParams.subscribe((params) => {
      let productId=params['productId'];
      console.log(productId)
     this.getProductById(productId)
    });
  }

getProductById(id:any){
this.productService.getProductById(id).subscribe((res:any)=>{
this.product = res.data[0];
this.cartAndWishlistStatus();
})
}

  addToCart(id: string) {
    let token = this.storageService.getJsonValue('token');
    if(token){
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
    else{
      alert('Login to add in cart')
    }
  }
  addToWishlist(id: any) {
    let token = this.storageService.getJsonValue('token');
   if(token){
    this.userService.addToWishlist(id).subscribe(
      (res: any) => {
        alert(res.message);
        this.cartAndWishlistStatus();
      },
      (err) => {
        alert(err.error.message)
      }
    );
   }else{
    alert('Login to add in Wishlist')
  }
  }

  cartAndWishlistStatus() {
    let token = this.storageService.getJsonValue('token');
    if(token){
      this.userService
      .existInCartAndWishlist(this.product._id)
      .subscribe((res: any) => {
        this.isExistInCart = res.isExistInCart;
        this.isExistInWishlist = res.isExistInWishlist;
      });
    }

  }

  removeFromCart(id: string) {
    this.userService.removeFromCart(id).subscribe((res:any) => {
      alert(res.message);
      this.cartAndWishlistStatus()
    });
  }

  openReviewDialog() {
    const dialogRef = this.dialog.open(ReviewComponent , {
      height:"40vh",
      width:"60vw",
      data:{
        productId:this.product._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     let obj = {
      rating:result.rating,
      comment:result.comment,
     }
     this.addComment(result.productId , obj)
    });
  }

  addComment(productId :string, comment:any ){
    this.productService.addComment(productId, comment).subscribe((res:any)=>{
        alert(res.message);
        window.location.reload();
    })
  }
}
