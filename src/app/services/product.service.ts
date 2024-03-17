import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private storageService:StorageService) { }

  fetchCategoryList(){
    let url = environment.baseUrl+"/getCategories"
    return this.http.get(url)
  }
  getAllProducts() {
    let url = environment.baseUrl + '/getProducts';
    return this.http.get(url)
  }
  addComment(productId:string , comment:any){
    let payload = {
      email: this.storageService.getJsonValue('email'),
      productId: productId,
      comment:comment
    };

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storageService.getJsonValue('token'),
    });

    return this.http.post(environment.baseUrl+'/comment' , payload, {headers})
  }
}
