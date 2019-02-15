import { Component, OnInit } from '@angular/core';
import { UserWallet } from '../models/user-wallet';
import { TransferCoinsService } from '../services/charge.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  userWallet: UserWallet;
  listUser: UserWallet[];
  listTransaction = [];
  successfulList: String;
  balanceAvailable: Number;
  realBalance: Number;
  amount: Number;
  receiver: String;
  walletId: String;
  isShow = true;
  constructor(private transferingCoins: TransferCoinsService, private router: Router, private userInfo: UserInfoService) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
  }
  
  ngOnInit() {
    this.getListTransaction();
    this.getAllUsers();
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }

  transferCoins(){
    debugger
    if (this.amount && this.userWallet.publicKey){
      this.transferingCoins.transferCoins(this.amount, this.userWallet.walletId, this.userWallet.publicKey)
        .subscribe(result => {
          alert(result);
        }, error => {
          alert("The information you filled is not correct" +error);
        })
    } else {
      alert("Please transfer again");
    }
  }

  getAllUsers(): void{
    this.userInfo.showAllUsers()
      .subscribe(listUsers => this.listUser = listUsers);
  }

  getUserDetail(walletId: String): void {
    debugger
    this.userInfo.showUserDetail(walletId)
      .subscribe(userWallet => {this.userWallet = userWallet});
  }

  getSuccessfulList(){
    debugger
    this.userInfo.getSuccessfulList(this.userWallet.walletId)
      .subscribe(succesfulList => {this.successfulList = succesfulList});
    this.isShow = !this.isShow;
  }

  getListTransaction(){
    this.userInfo.getListTransaction()
      .subscribe(result => {this.listTransaction = result});
  }
}
