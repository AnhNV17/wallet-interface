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
}
