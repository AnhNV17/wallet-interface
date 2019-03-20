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
  balance_available: Number;
  userchoices = ["Tea", "Coffee", "Yogurt"];
  // userchoice = "Tea";
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

  userPublicKey: String;
  userWalletInfor: UserWallet;

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

    this.simpleItems = ["Tea", "Coffee", "Yogurt"];
    this.updateBalance(this.userWallet.walletId);
    this.getListTransaction();
    this.formHome.reset();
    this.getUserDetail(this.userWallet.walletId);
    // this.userOptions.focus();
  }

  getUserDetail(walletId: String): void {
    this.userInfoService.showUserDetail(walletId)
      .subscribe(userWallet => { this.userPublicKey = userWallet.publicKey });
  }

  updateBalance(walletId: String) {
    this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
      this.walletBalance = balance;
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
    this.buyService
      .buy(this.buyQuantity, this.userChoice, this.userWallet.publicKey, this.real_balance)
      .subscribe(balance => {
        // console.log(86, this.userWallet.publicKey)
        this.walletBalance = balance;
        alert(this.walletBalance.message);
      });
    this.updateBalance(this.userWallet.walletId);
    this.updateListHistory();
  }

  transfer() {
    this.getValueForTransfer();
    this.transferService
      .transfer(this.transferAmount, this.transferReceiver, this.userPublicKey)
      .subscribe(balance => {
        this.walletBalance = balance;
        alert(this.walletBalance.message);
      });
    // this.updateBalance(this.walletId);
    // this.updateListHistory();
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

  getListTransaction() {
    this.userInfoService.getListTransaction().subscribe(result => {
      this.listTransaction = result;
    });
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
