import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  transfer(amount: Number, receiver: String, publicKey: String){
    return this.http.post<UserWallet>('http://localhost:3000/wallet/transfer', {
      amount: amount,
      receiver: receiver,
      publicKey: publicKey,
      // real_balance: real_balance
    })
  }
}
