import { Component, OnInit } from '@angular/core';
import { UserWallet } from '../models/user-wallet';
import { TransferingCoins } from '../models/transferingCoins';
import { TransferCoinsService } from '../services/transfer-coins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  userWallet: UserWallet;
  balanceAvailable: Number;
  realBalance: Number;
  amount: Number;
  receiver: String;
  walletId: String;
  transferInfo: TransferingCoins;
  constructor(private transferingCoins: TransferCoinsService, private router: Router) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    this.balanceAvailable = this.userWallet.balance;
    this.realBalance = this.userWallet.balance;
    this.transferInfo = new TransferingCoins();
   }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }

  transferCoins(){
    if (this.transferInfo.amount && this.transferInfo.receiver){
      this.transferingCoins.transferCoins(this.transferInfo, this.userWallet.walletId, this.realBalance, this.balanceAvailable)
        .subscribe(result => {
          this.balanceAvailable = result
        }, error => {
          alert("The information you filled is not correct" +error);
        })
    } else {
      alert("Please transfer again");
    }
    debugger
  }
}
