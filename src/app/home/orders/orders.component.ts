import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: any[] = [];
  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private userService: UserService,
    private router:Router
  ) {
    this.getAllOrders();
  }

  getAllOrders() {
    let email = this.storageService.getJsonValue('email');
    this.orderService.getOrders(email).subscribe((res: any) => {
      this.orders = res;
    });
  }

  displayProduct(id: any) {
    let arr = [id]
    this.userService.fetchproductsById(arr).subscribe((res:any) => {
      this.router.navigate(['details'], {
        queryParams: { product: JSON.stringify(res.data[0]) },
      })
    });
  }
}
