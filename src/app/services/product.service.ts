import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  fetchCategoryList(){
    let url = environment.baseUrl+"/getCategories"
    return this.http.get(url)
  }
  getAllProducts() {
    let url = environment.baseUrl + '/getProducts';
    return this.http.get(url)
  }
}
