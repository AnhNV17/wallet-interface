import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  showAllUsers(){
    return this.http.get<UserWallet[]>('http://localhost:3000/account');
  }

  showUserDetail(id: String){
    return this.http.get<UserWallet>(`http://localhost:3000/account/${id}`);
  }

  getSuccessfulList(publicKey: String){
    return this.http.get<String>(`http://localhost:3000/wallet/success_list/${publicKey}`);
  }

  getUserRequests(){
    return this.http.get<[]>('http://localhost:3000/wallet/user_requests');
  }

  getChargingList(){
    return this.http.get<[]>("http://localhost:3000/wallet/charging_list");
  }

  getListHistory(publicKey: String){
    return this.http.get<[]>(`http://localhost:3000/wallet/pending_list/${publicKey}`);
  }
}
