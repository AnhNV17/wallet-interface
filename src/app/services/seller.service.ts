import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';
import { RequestDetail } from '../models/table-detail';

@Injectable({
    providedIn: 'root'
})
export class SellerService {

    constructor(private http: HttpClient) { }
    createTransaction(requestId: String, productName: String, quantity: Number, productCode: String, manufacturingDate: String, expiry: String, series: String, manufacturer: String, receiver: String, userAddress: String, amount: String) {
        return this.http.post<UserWallet>('http://localhost:3000/seller/user_transaction', {
            requestId: requestId,
            productName: productName,
            quantity: quantity,
            productCode: productCode,
            manufacturingDate: manufacturingDate,
            expiry: expiry,
            series: series,
            manufacturer: manufacturer,
            receiver: receiver,
            userAddress: userAddress,
            amount: amount
        })
    }

    getUserRequests(maxResultCount: number, pageNumber: number) {
        return this.http.get<RequestDetail>(`http://localhost:3000/seller/user_requests/${maxResultCount}/${pageNumber}`);
    }

    requestToSuppliers(productName: String, quantity: Number, publicKey: String, brand: String) {
        return this.http.post<UserWallet>('http://localhost:3000/seller/requests_to_suppliers', {
            productName: productName,
            quantity: quantity,
            publicKey: publicKey,
            brand: brand
        })
    }
}