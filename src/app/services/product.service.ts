import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInfor } from '../models/productInfor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductInfo(productCode: String){
    return this.http.get<ProductInfor>(`http://localhost:3000/product/${productCode}`);
  }
}
