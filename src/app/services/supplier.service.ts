import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';
import { RequestDetail } from '../models/table-detail';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    constructor(private http: HttpClient) { }
    createTransaction(requestId: String, userAddress: String, supplier: String, consignment: Number, productCode: String, manufacturingDate: String, expiry: String, series: String,
        manufacturer: String) {
        return this.http.post<UserWallet>('http://localhost:3000/supplier/seller_transaction', {
            requestId: requestId,
            userAddress: userAddress,
            supplier: supplier,
            consignment: consignment,
            productCode: productCode,
            manufacturingDate: manufacturingDate,
            expiry: expiry,
            series: series,
            manufacturer: manufacturer
        })
    }

    getSellerRequests(maxResultCount: number, pageNumber: number) {
        return this.http.get<RequestDetail>(`http://localhost:3000/supplier/seller_requests/${maxResultCount}/${pageNumber}`);
    }
}