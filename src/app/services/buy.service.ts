import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  buy(quantity: Number, userchoice: String, publicKey: String){
    return this.http.post<UserWallet>('http://localhost:3000/wallet/buy', {
      quantity: quantity,
      userchoice: userchoice,
      publicKey: publicKey
    })
  }
}
