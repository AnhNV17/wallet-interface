import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInfor } from '../models/productInfor';
import { TrackingData } from '../models/trackingData';
import { TableResult } from '../models/table-detail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductInfo(productCode: String) {
    return this.http.get<ProductInfor>(`http://localhost:3000/product/${productCode}`);
  }

  trackDataForSeller(publicKey: String, requestId: String) {
    return this.http.get<TrackingData>(`http://localhost:3000/product/track_data/${publicKey}/${requestId}`);
  }

  trackDataForUser(productCode: String, publicKey: String) {
    return this.http.get<TrackingData>(`http://localhost:3000/product/track_productCode/${productCode}/${publicKey}`)
  }

  getPackageDbByName(productName: String, maxResultCount: number, pageNumber: number) {
    return this.http.get<TableResult>(`http://localhost:3000/product/getProductFrDb/${productName}/${maxResultCount}/${pageNumber}`)
  }
}
