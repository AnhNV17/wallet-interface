import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';
import { ReturnMessage } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  buy(username: String, quantity: Number, userchoice: String, publicKey: String){
    return this.http.post<ReturnMessage>('http://localhost:3000/user/buy', {
      username: username,
      quantity: quantity,
      userchoice: userchoice,
      publicKey: publicKey
    })
  }

}
