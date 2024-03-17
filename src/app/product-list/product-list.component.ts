import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() selectedCategory!: string;
  allProducts: any[] = [];
  products: any[] = [];
  constructor(
    private productService: ProductService,
    private commonService: CommonService,
   
  ) {
    this.getAllProducts();
  }
  ngOnInit(): void {
    this.commonService.searchMode$.subscribe((data) => {
      if (data.mode) {
        this.filterProducts(data.searchText);
      } else {
        this.products = this.allProducts;
      }
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.allProducts = res.data;
      this.products = res.data;
      
    });
  }

  filterProducts(searchText: string) {
    this.products = this.allProducts.filter((product: any) => {
      return (
        product.description.toLowerCase().includes(searchText.toLowerCase()) ||
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    console.log(this.products);
  }

 

 
}
