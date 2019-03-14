import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferCoinsService {

  constructor(private http: HttpClient) { }

  transferCoins(amount: Number, walletId: String, receiver: String){
    return this.http.post<Number>('http://localhost:3000/user_wallet/charge', {
      amount: amount,
      walletId: walletId,
      receiver: receiver
    })
  }
}
