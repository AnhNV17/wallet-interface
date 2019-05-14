import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';
import { ProductInfor } from '../models/productInfor';
import { UserRole } from '../models/userRole';

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
    return this.http.get<[]>(`http://localhost:3000/wallet/success_list/${publicKey}`);
  }

  getChargingList(){
    return this.http.get<[]>("http://localhost:3000/wallet/charging_list");
  }

  getListHistory(publicKey: String){
    return this.http.get<[]>(`http://localhost:3000/user/pending_list/${publicKey}`);
  }

  getHistory(publicKey: String){
    return this.http.get<[]>(`http://localhost:3000/seller/history/${publicKey}`);
  }

  getRequestList(publicKey: String){
    return this.http.get<[]>(`http://localhost:3000/user/requests_to_sellers/${publicKey}`);
  }

  getDataBC() {
    return this.http.get<ProductInfor>(`http://localhost:3000/wallet/getDataBlockchain`);
  }

  getUserAsRole(role: String) {
    return this.http.get<[UserRole]>(`http://localhost:3000/account/get_list/${role}`)
  }

  getUsernameByPK(publicKey: String) {
    return this.http.get<String>(`http://localhost:3000/account/getUsername/${publicKey}`);
  }
}

