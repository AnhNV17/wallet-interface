import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';
import { ReturnMessage } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class TransferCoinsService {

  constructor(private http: HttpClient) { }

  transferCoins(amount: Number, walletId: String, receiver: String){
    return this.http.post<ReturnMessage>('http://localhost:3000/wallet/charge', {
      amount: amount,
      walletId: walletId,
      receiver: receiver
    })
  }
}
