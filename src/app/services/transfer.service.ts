import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  transfer(amount: Number, receiver: String, publicKey: String, real_balance: Number){
    return this.http.post<UserWallet>('http://localhost:3000/user_wallet/transfer', {
      amount: amount,
      receiver: receiver,
      publicKey: publicKey,
      real_balance: real_balance
    })
  }
}
