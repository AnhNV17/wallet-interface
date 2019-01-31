import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferingCoins } from '../models/transferingCoins';

@Injectable({
  providedIn: 'root'
})
export class TransferCoinsService {

  constructor(private http: HttpClient) { }

  transferCoins(transferInfo: TransferingCoins, walletId: String, realBalance: Number, balanceAvailable: Number){
    return this.http.post<Number>('http://localhost:3000/user_wallet/charge', {
      amount: transferInfo.amount,
      receiver: transferInfo.receiver,
      walletId: walletId,
      realBalance: realBalance,
      balanceAvailable: balanceAvailable
    })
  }
}
