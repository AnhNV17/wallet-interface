import { Component, OnInit } from '@angular/core';
import { UserWallet } from '../models/user-wallet';
import { UpdateBalanceService } from '../services/update-balance.service';
import { BuyService } from '../services/buy.service';
import { TransferService } from '../services/transfer.service';
import { UserInfoService } from '../services/user-info.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userWallet: UserWallet;
  walletBalance: UserWallet;
  listTransaction = [];
  balance: Number;
  walletId: String;
  balance_available: Number;
  userchoices= ["Tea", "Coffee", "Yogurt"];
  userchoice = 'Tea';
  simpleItems = [];
  successfulList: String;
  isShow = true;
  constructor(private updateBalanceService: UpdateBalanceService, private buyService: BuyService, private transferService: TransferService, private userInfoService: UserInfoService) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    this.walletId = this.userWallet.walletId;
    
   }

  ngOnInit() {
    this.simpleItems = ["Tea", "Coffee", "Yogurt"];
    this.updateBalance(this.walletId);
    this.getListTransaction();
  }

  updateBalance(walletId: String){
    this.updateBalanceService.updateBalance(walletId)
      .subscribe(balance => {this.walletBalance = balance});
  }

  buy(quantity: Number, userchoice: String, real_balance: Number){
    debugger
    this.buyService.buy(quantity, userchoice, this.userWallet.publicKey, real_balance)
      .subscribe(balance => { this.walletBalance = balance});
      alert(this.walletBalance.message);
  }

  transfer(amount: Number, receiver: String, real_balance: Number){
    debugger
    this.transferService.transfer(amount, receiver, this.userWallet.publicKey, real_balance)
      .subscribe(balance => { this.walletBalance = balance});
      alert(this.walletBalance.message);
  }

  getSuccessfulList(){
    debugger
    this.userInfoService.getSuccessfulList(this.userWallet.walletId)
      .subscribe(succesfulList => {this.successfulList = succesfulList});
    this.isShow = !this.isShow;
  }

  getListTransaction(){
    this.userInfoService.getListTransaction()
      .subscribe(result => {this.listTransaction = result});
  }
}
