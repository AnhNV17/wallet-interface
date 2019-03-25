import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class TransferCoinsService {

  constructor(private http: HttpClient) { }

  transferCoins(amount: Number, walletId: String, receiver: String){
    return this.http.post<UserWallet>('http://localhost:3000/wallet/charge', {
      amount: amount,
      walletId: walletId,
      receiver: receiver
    })
  }
}
