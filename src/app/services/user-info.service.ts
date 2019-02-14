import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  showAllUsers(){
    return this.http.get<UserWallet[]>('http://localhost:3000/user');
  }

  showUserDetail(id: String){
    return this.http.get<UserWallet>(`http://localhost:3000/wallet/${id}`);
  }

  getSuccessfulList(walletId: String){
    return this.http.get<String>(`http://localhost:3000/user_wallet/successful_list/${walletId}`);
  }

  getListTransaction(){
    return this.http.get<[]>('http://localhost:3000/user_wallet/getListTransaction');
  }
}
