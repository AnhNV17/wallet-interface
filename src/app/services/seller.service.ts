import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';
import { TableResult } from '../models/table-detail';
import { ReturnMessage } from '../models/message';

@Injectable({
    providedIn: 'root'
})
export class SellerService {

    constructor(private http: HttpClient) { }
    createTransaction(requestId: String, listData: [], userAddress: String, receiver: String) {
        return this.http.post<ReturnMessage>('http://localhost:3000/seller/user_transaction', {
            requestId: requestId,
            listData: listData,
            receiver: receiver,
            userAddress: userAddress
        })
    }

    getUserRequests(maxResultCount: number, pageNumber: number) {
        return this.http.get<TableResult>(`http://localhost:3000/seller/user_requests/${maxResultCount}/${pageNumber}`);
    }

    requestToSuppliers(username: String, productName: String, quantity: Number, publicKey: String, brand: String) {
        return this.http.post<ReturnMessage>('http://localhost:3000/seller/requests_to_suppliers', {
            username: username,
            productName: productName,
            quantity: quantity,
            publicKey: publicKey,
            brand: brand
        })
    }

    getRequests(publicKey: String) {
        return this.http.get<[]>(`http://localhost:3000/seller/requests/${publicKey}`);
    }

    getConsignment(publicKey: String, maxResultCount: number, pageNumber: number) {
        return this.http.get<TableResult>(`http://localhost:3000/seller/products/${publicKey}/${maxResultCount}/${pageNumber}`);
    }

    getBill(maxResultCount: Number, pageNumber: Number, publicKey: String, productName: String) {
        return this.http.get<TableResult>(`http://localhost:3000/supplier/products/${maxResultCount}/${pageNumber}/${publicKey}/${productName}`);
    }
}