import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserWallet } from '../models/user-wallet';

@Injectable({
  providedIn: 'root'
})
export class UpdateBalanceService {

  constructor(private http: HttpClient) { }

  
}
