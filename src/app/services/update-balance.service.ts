import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class UpdateBalanceService {

  constructor(private http: HttpClient) { }

  updateBalance(walletId: String){
    return this.http.get<Number>(`http://localhost:3000/wallet/update_balance/${walletId}`);
  }
  
}
