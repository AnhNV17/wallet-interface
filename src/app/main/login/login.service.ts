import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validateLogin(username: String, password: String){
    return this.http.post<UserWallet>('http://localhost:3000/account/login', {
      username: username,
      password: password
    })
  }
}
