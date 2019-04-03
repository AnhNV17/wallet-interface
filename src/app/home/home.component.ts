import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UserWallet } from "../models/user-wallet";
import { UpdateBalanceService } from "../services/update-balance.service";
import { BuyService } from "../services/buy.service";
import { TransferService } from "../services/transfer.service";
import { UserInfoService } from "../services/user-info.service";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { Paginator } from 'primeng/primeng';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('AppHomeModal') modal: ModalDirective;
  @ViewChild('UserOptions') userOptions: NgSelectComponent;
  @ViewChild('paginator') paginator: Paginator;

  userWallet: UserWallet;
  walletBalance: UserWallet;
  listRequest = [];
  listHistory = [];
  balance: Number;
  walletId: String;
  showError = false;

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

  transferingBtn = false;
  buyingBtn = false;
  showBuyError = false;
  showTransferError = false;

  dataBC: any;

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

    this.simpleItems = ["Abrica", "Robusta", "Culi", "TrungNguyen"];
    this.updateBalance(this.userWallet.walletId);
    // this.getDataBC();
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
    let check = '';
    let fControls = { userChoice: FormControl, quantity: FormControl }
    for (var control in fControls) {
      if (this.formHome.get(control).errors) {
        check = control;
        this.showError = true;
        break;
      }
    }
    if (check != '') {
      for (var control in fControls) {
        this.formHome.get(control).markAsTouched({ onlySelf: true });
      }
      $('#' + check).focus();
      if (check == 'userChoice')
        this.userOptions.focus();
    } else {

      this.getValueForBuy();
      // console.log(95, this.userWallet.publicKey)
      if (this.buyQuantity && this.userChoice) {
        this.buyService
          .buy(this.userWallet.username, this.buyQuantity, this.userChoice, this.userWallet.publicKey)
          .subscribe(balance => {
            this.walletBalance = balance;
            Swal.fire({
              type: 'success',
              title: String(this.walletBalance.message)
            })
          });
        this.updateBalance(this.userWallet.walletId);
        this.updateListHistory();
        this.formHome.get("userChoice").reset();
        this.formHome.get("quantity").reset();
      } else {
        // alert('Please fill the form to transfer');
        Swal.fire({
          // type: 'error',
          text: "Please fill the form to transfer",
        })
      }
    }
  }

  transfer() {
    let check = '';
    let fControls = { amount: FormControl, receiver: FormControl }
    for (var control in fControls) {
      if (this.formHome.get(control).errors) {
        check = control;
        this.showError = true;
        break;
      }
    }
    if (check != '') {
      for (var control in fControls) {
        this.formHome.get(control).markAsTouched({ onlySelf: true });
      }
      $('#' + check).focus();
    } else {

      this.getValueForTransfer();
      if (this.transferAmount && this.transferReceiver) {
        this.transferService
          .transfer(this.transferAmount, this.transferReceiver, this.userWallet.publicKey)
          .subscribe(balance => {
            this.walletBalance = balance;
            // alert(this.walletBalance.message);
            Swal.fire({
              // type: 'success',
              title: String(this.walletBalance.message)
            })
          });
        // this.updateBalance(this.walletId);
        // this.updateListHistory();
        this.formHome.get("amount").reset();
        this.formHome.get("receiver").reset();
      } else {
        Swal.fire({
          // type: 'error',
          text: "Please fill the form to transfer",
        })
      }

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

  updateListHistory() {
    this.userInfoService.getListHistory(this.userWallet.publicKey)
      .subscribe(result => { this.listHistory = result });
  }

  getListHistory() {
    this.userInfoService.getListHistory(this.userWallet.publicKey)
      .subscribe(result => { this.listHistory = result });
    this.isDisplay = !this.isDisplay;
  }

  getRequests() {
    this.userInfoService.getRequestList(this.userWallet.publicKey)
      .subscribe(result => { this.listRequest = result });
    this.isDisplay = !this.isDisplay;
  }

  getDataBC(): void {
    this.userInfoService.getDataBC()
      .subscribe(result => {
        this.dataBC = result,
          console.log(175, result)
      })
    // for (let i = 0; i < this.dataBC.length; i++) {
    //   console.log(178, this.dataBC[i])
    // }
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }
}
