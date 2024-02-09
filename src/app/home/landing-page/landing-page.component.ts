import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  categories: any[] = [];
  selectedCategory!: string;
  constructor(private productService: ProductService) {
    this.getProductList();
  }

  getProductList() {
    this.productService.fetchCategoryList().subscribe((res: any) => {
      this.categories = res;
      this.categories.unshift({
        name: 'All',
      });
      this.selectedCategory = this.categories[0].name;
    });
  }
  getCategoryIcon(category: string) {
    let obj: any = {
      Mobile: 'fa-solid fa-mobile-screen-button',
      Laptop: 'fa-solid fa-laptop',
      Television: 'fa-solid fa-tv',
      Camera: 'fa-solid fa-camera',
      'Audio Devices': 'fa-solid fa-headphones',
      'Home Appliance': 'fa-solid fa-house',
      All: 'fa-solid fa-cart-shopping',
    };
    return obj[category];
  }
}
