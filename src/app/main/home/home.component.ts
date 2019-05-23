import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UserWallet } from "../../models/user-wallet";
import { UpdateBalanceService } from "../../services/update-balance.service";
import { BuyService } from "../../services/buy.service";
import { TransferService } from "../../services/transfer.service";
import { UserInfoService } from "../../services/user-info.service";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { Table } from 'primeng/components/table/table';
import { ProductDetailModalComponent } from '../productDetail/productDetail.component';
import { SellerService } from 'src/app/services/seller.service';
import { FormatStringComponent } from 'src/app/shared/ifichain/formatString.component';
import { ValidationComponent } from 'src/app/shared/ifichain/validation-messages.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('AppHomeModal') modal: ModalDirective;
  @ViewChild('UserOptions') userOptions: NgSelectComponent;
  @ViewChild('ReceiverOptions') receiverOptions: NgSelectComponent;
  @ViewChild('SellerOptions') sellerOptions: NgSelectComponent;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('dataTable') dataTable: Table;
  @ViewChild('productDetailModal') productDetailModal: ProductDetailModalComponent;

  userWallet: UserWallet;
  walletBalance: UserWallet;
  listRequest = [];
  listHistory = [];
  balance: Number;
  walletId: String;
  showError = false;

  simpleItems = [];
  successfulList: any;
  isShow = true;
  isDisplay = true;
  formHome: FormGroup;

  userChoice: any;
  buyQuantity: Number;
  transferAmount: Number;
  real_balance: Number;

  transferingBtn = false;
  buyingBtn = false;
  showBuyError = false;
  showTransferError = false;
  showRequest = true;

  primengTableHelper: PrimengTableHelper;
  dataBC: any;

  sellerAddress: any;
  receiverAddress: any;

  trackingCode: String;
  listSeller: any;
  listUser: any;

  typeSuccess: String;

  constructor(
    private updateBalanceService: UpdateBalanceService,
    private buyService: BuyService,
    private transferService: TransferService,
    private userInfoService: UserInfoService,
    private router: Router,
    private sellerSevice: SellerService
  ) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    this.primengTableHelper = new PrimengTableHelper();
  }

  ngOnInit() {
    /** Declare formgroup, formcontrol */
    this.formHome = new FormGroup({
      userChoice: new FormControl('', { validators: [Validators.required] }),
      quantity: new FormControl('', { validators: [Validators.required] }),
      seller: new FormControl('', { validators: [Validators.required] }),
      amount: new FormControl('', { validators: [Validators.required] }),
      receiver: new FormControl('', { validators: [Validators.required] }),
      trackingCode: new FormControl('', { validators: [ValidationComponent.checkCharacters, Validators.required] })
    }, { updateOn: 'change' });

    this.simpleItems = ["Abrica", "Robusta", "Culi", "TrungNguyen"];
    this.updateBalance(this.userWallet.walletId);
    // this.getDataBC();
    this.formHome.reset();
    this.getSellers();
    this.getAllUser();
  }

  uppercaseAll(e: any) {
    this.trackingCode = FormatStringComponent.vietHoa(e);
  }

  getSellers(): void {
    let sellers = [];
    this.userInfoService.getUserAsRole("seller").subscribe(result => {
      result.forEach(item => {
        sellers.push({ id: item.publicKey, displayName: item.username });
      })
    }, () => { }, () => {
      this.listSeller = sellers;
    })
  }

  getAllUser(): void {
    let users = [];
    this.userInfoService.getAllUser().subscribe(result => {
      result.forEach(item => {
        users.push({ id: item.publicKey, displayName: item.username });
      })
    }, () => { }, () => {
      this.listUser = users;
    })
  }

  updateBalance(walletId: String) {
    this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
      this.userWallet.balance = balance;
    });
  }

  getValueForBuy() {
    this.formHome.get('userChoice').setValue(this.userChoice);
    this.formHome.get('quantity').setValue(this.buyQuantity);
    this.formHome.get('seller').setValue(this.sellerAddress);
  }

  getValueForTransfer() {
    this.formHome.get('amount').setValue(this.transferAmount);
    this.formHome.get('receiver').setValue(this.receiverAddress);
  }

  buy() {
    let check = '';
    let fControls = { userChoice: FormControl, quantity: FormControl, seller: FormControl }
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
      if (check == 'userChoice') {
        this.userOptions.focus();
      } else if (check == 'seller') {
        this.sellerOptions.focus();
      }
    } else {

      this.getValueForBuy();
      console.log(153, "sellerAddress: " + this.sellerAddress)
      if (this.buyQuantity && this.userChoice) {
        this.buyService
          .buy(
            this.userWallet.username,
            this.buyQuantity,
            this.userChoice,
            this.userWallet.publicKey,
            this.sellerAddress
          )
          .subscribe(result => {
            if (result.typeMess == "success") {
              Swal.fire({
                type: 'success',
                title: String(result.message)
              })
            } else if (result.typeMess == "error") {
              Swal.fire({
                type: 'error',
                title: String(result.message)
              })
            }
          });
        this.updateBalance(this.userWallet.walletId);
        this.updateListHistory();
        // this.formHome.get("userChoice").reset();
        // this.formHome.get("quantity").reset();
        this.formHome.reset();
      } else {
        // alert('Please fill the form to transfer');
        Swal.fire({
          type: "info",
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
      if (check == "receiver") {
        this.receiverOptions.focus();
      }
    } else {

      this.getValueForTransfer();
      if (this.transferAmount && this.receiverAddress) {
        this.transferService
          .transfer(this.transferAmount, this.receiverAddress, this.userWallet.publicKey)
          .subscribe(result => {
            if (result.typeMess == "success") {
              Swal.fire({
                type: 'success',
                title: String(result.message)
              })
            } else if (result.typeMess == "error") {
              Swal.fire({
                type: 'error',
                title: String(result.message)
              })
            }
          });
        // this.updateBalance(this.walletId);
        // this.updateListHistory();
        this.formHome.get("amount").reset();
        this.formHome.get("receiver").reset();
      } else {
        Swal.fire({
          type: "info",
          text: "Please fill the form to transfer",
        })
      }

    }
  }

  getSuccessfulList() {
    this.userInfoService
      .getSuccessfulList(this.userWallet.publicKey)
      .subscribe(succesfulList => {
        console.log(262, succesfulList)
        this.successfulList = succesfulList;
        console.log(262, this.successfulList)
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
    this.showRequest = !this.showRequest;
  }

  getTrackingCode(): void {
    this.formHome.get('trackingCode').setValue(this.trackingCode);
  }

  trackingDataByCode(): void {
    let check = '';
    let fControls = { trackingCode: FormControl }
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
      this.getTrackingCode();
      this.productDetailModal.show('', this.trackingCode);
    }
  }

  trackingData(reqId: String): void {
    this.productDetailModal.show(reqId, '');
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }

}
