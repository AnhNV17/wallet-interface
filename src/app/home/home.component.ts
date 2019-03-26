import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UserWallet } from "../models/user-wallet";
import { UpdateBalanceService } from "../services/update-balance.service";
import { BuyService } from "../services/buy.service";
import { TransferService } from "../services/transfer.service";
import { UserInfoService } from "../services/user-info.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('AppHomeModal') modal: ModalDirective;
  @ViewChild('UserOptions') userOptions: NgSelectComponent;

  userWallet: UserWallet;
  walletBalance: UserWallet;
  listTransaction = [];
  listHistory = [];
  balance: Number;
  walletId: String;
  userchoices = ["Abrica", "Robusta", "Culi"];

  simpleItems = [];
  successfulList: String;
  isShow = true;
  isDisplay = true;
  formHome: FormGroup;

  userChoice: any;
  buyQuantity: Number;
  transferAmount: Number;
  transferReceiver: String;
  real_balance: Number;

  // userPublicKey: String;
  // userWalletInfor: UserWallet;

  transferingBtn = false;
  buyingBtn = false;
  showBuyError = false;
  showTransferError = false;

  constructor(
    private updateBalanceService: UpdateBalanceService,
    private buyService: BuyService,
    private transferService: TransferService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));

  }

  ngOnInit() {
    /** Declare formgroup, formcontrol */
    this.formHome = new FormGroup({
      userChoice: new FormControl('', { validators: [Validators.required] }),
      quantity: new FormControl('', { validators: [Validators.required] }),
      amount: new FormControl('', { validators: [Validators.required] }),
      receiver: new FormControl('', { validators: [Validators.required] }),
    }, { updateOn: 'change' });

    this.simpleItems = ["Abrica", "Robusta", "Culi"];
    this.updateBalance(this.userWallet.walletId);
    // this.getListTransaction();
    this.formHome.reset();
  }

  updateBalance(walletId: String) {
    this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
      this.userWallet.balance = balance;
    });
  }

  getValueForBuy() {
    this.formHome.get('userChoice').setValue(this.userChoice);
    this.formHome.get('quantity').setValue(this.buyQuantity);
  }

  getValueForTransfer() {
    this.formHome.get('amount').setValue(this.transferAmount);
    this.formHome.get('receiver').setValue(this.transferReceiver);
  }

  buy() {
    this.getValueForBuy();
    console.log(95, this.userWallet.publicKey)
    if (this.buyQuantity && this.userChoice){
      this.buyService
        .buy(this.userWallet.username ,this.buyQuantity, this.userChoice, this.userWallet.publicKey)
        .subscribe(balance => {
          this.walletBalance = balance;
          alert(this.walletBalance.message);
        });
      this.updateBalance(this.userWallet.walletId);
      this.updateListHistory();
    } else {
      alert('Please fill the form to transfer');
    }
    this.formHome.get("userChoice").reset();
    this.formHome.get("quantity").reset();
  }

  transfer() {
    this.getValueForTransfer();
    if (this.transferAmount && this.transferReceiver){
      this.transferService
        .transfer(this.transferAmount, this.transferReceiver, this.userWallet.publicKey)
        .subscribe(balance => {
          this.walletBalance = balance;
          alert(this.walletBalance.message);
        });
      // this.updateBalance(this.walletId);
      // this.updateListHistory();
    } else {
      alert('Please fill the form to transfer');
    }
    this.formHome.get("amount").reset();
    this.formHome.get("receiver").reset();
  }

  getSuccessfulList() {
    this.userInfoService
      .getSuccessfulList(this.userWallet.publicKey)
      .subscribe(succesfulList => {
        this.successfulList = succesfulList;
      });
    this.isShow = !this.isShow;
    this.updateBalance(this.userWallet.walletId);
  }

  updateListHistory() {
    this.userInfoService.getListHistory(this.userWallet.publicKey)
      .subscribe(result => { this.listHistory = result });
  }

  getListHistory() {
    this.userInfoService.getListHistory(this.userWallet.publicKey)
      .subscribe(result => { this.listHistory = result });
    this.isDisplay = !this.isDisplay;
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }
}
