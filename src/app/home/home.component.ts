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

    this.simpleItems = ["Tea", "Coffee", "Yogurt"];
    // this.updateBalance(this.userWallet.walletId);
    // this.getListTransaction();
    this.formHome.reset();
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
    let check = '';
    let formControlNames = { userChoice: FormControl, quantity: FormControl };
    for (var control in formControlNames) {
      if (this.formHome.get(control).errors) {
        check = control;
        this.showBuyError = true;
        break;
      }
    }
    if (check != '') {
      for (var control in formControlNames) {
        this.formHome.get(control).markAsTouched({ onlySelf: true });
      }
      $('#' + check).focus();
      if (check == "userChoice") {
        this.userOptions.focus();
      }
    } else {
      this.showBuyError = false;
      this.getValueForBuy();
      if (this.buyQuantity && this.userChoice && this.userWallet.publicKey) {
        this.buyService
          .buy(this.buyQuantity, this.userChoice, this.userWallet.publicKey, this.real_balance)
          .subscribe(balance => {
            this.walletBalance = balance;
            alert(this.walletBalance.message);
          });
        // this.updateBalance(this.userWallet.walletId);
        // this.updateListHistory();
      } else {
        alert("enter enough data");
      }
      this.formHome.get('userChoice').reset();
      this.formHome.get('quantity').reset();
    }

  }

  transfer() {
    let check = '';
    let formControls = { amount: FormControl, receiver: FormControl };
    for (var control in formControls) {
      if (this.formHome.get(control).errors) {
        check = control;
        this.showTransferError = true;
        break;
      }
    }
    if (check != '') {
      for (var control in formControls) {
        this.formHome.get(control).markAsTouched({ onlySelf: true });
      }
      $('#' + check).focus();
    } else {
      this.showTransferError = false;
      this.transferingBtn = true;
      this.getValueForTransfer();
      if (this.transferAmount && this.transferReceiver && this.userWallet.publicKey) {
        this.transferService
          .transfer(this.transferAmount, this.transferReceiver, this.userWallet.publicKey)
          // .pipe(finalize(() => { this.transferingBtn = false; }))
          .subscribe(balance => {
            this.walletBalance = balance;
            alert(this.walletBalance.message);
          });
        // this.updateBalance(this.walletId);
        // this.updateListHistory();
      } else {
        alert("enter enough data!!!")
      }
      this.formHome.get('amount').reset();
      this.formHome.get('receiver').reset();
    }

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
