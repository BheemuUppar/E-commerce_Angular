import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements AfterViewInit {
  products: any = [];
  displayedColumns = ['Select', 'Name', 'Quantity', 'Price', 'Total'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {
    this.fetchCartIds();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchCartIds() {
    let arr: any[] = [];
    this.userService.fetchCartList().subscribe(
      (res: any) => {
        console.log('cart: ', res.data);
        for (let obj of res.data) {
          arr.push(obj.id);
        }
        this.getProductsData(arr);
      },
      (error) => {}
    );
  }

  getProductsData(listOfId: any[]) {
    this.userService.fetchproductsById(listOfId).subscribe((res: any) => {
      this.products = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.addDefaultQuanttity();
    });
  }

  addDefaultQuanttity() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.dataSource.data[i]['quantity'] = 1;
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  increaseQuantity(id: string) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i]._id == id) {
        this.dataSource.data[i]['quantity'] = ++this.dataSource.data[i][
          'quantity'
        ];
        break;
      }
    }
  }

  decreaseQuantity(id: string) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (
        this.dataSource.data[i]._id == id &&
        this.dataSource.data[i]['quantity'] != 1
      ) {
        this.dataSource.data[i]['quantity'] = --this.dataSource.data[i][
          'quantity'
        ];
        break;
      }
    }
  }

  calculatePrice(price: any, quantity: number) {
    return (price * quantity).toFixed(2);
  }

  getSelectedTotalPrice() {
    let price = 0;
    for (let product of this.selection.selected) {
      price += Number(this.calculatePrice(product.price, product.quantity));
    }
    return price;
  }

  checkout() {
    let data = {
      selectedProducts: this.selection.selected,
      totalPrice: this.getSelectedTotalPrice(),
    };
    this.router.navigate(['checkout'], {
      queryParams: { product: JSON.stringify(data) },
    });
  }
}
