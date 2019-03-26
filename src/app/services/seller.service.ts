import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
    providedIn: 'root'
})
export class SellerService {

    constructor(private http: HttpClient) { }
    createTransaction(requestId: String, productName: String, productCode: String, series: String, manufacturer: String, receiver: String, userAddress: String, amount: String) {
        return this.http.post<UserWallet>('http://localhost:3000/wallet/user_transaction', {
            requestId: requestId,
            productName: productName,
            productCode: productCode,
            series: series,
            manufacturer: manufacturer,
            receiver: receiver,
            userAddress: userAddress,
            amount: amount
        })
    }
}