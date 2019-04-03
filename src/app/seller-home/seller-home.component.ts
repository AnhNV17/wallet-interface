import {
  OnInit,
  Component,
  Injector,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { appModuleAnimation } from "shared/animations/routerTransition";
import { UserWallet } from "../models/user-wallet";
import { Router } from "@angular/router";
import { UserInfoService } from "../services/user-info.service";
import { SellerInputComponent } from "./seller-input/seller-input.component";
import { UpdateBalanceService } from '../services/update-balance.service';

export class SelectItem {
  id: number;
  displayName: String;
}

@Component({
  selector: "sellerHomeModal",
  templateUrl: "./seller-home.component.html",
  styleUrls: ["./seller-home.component.css"],
  animations: [appModuleAnimation()]
})
export class SellerHomeComponent implements OnInit {
  @ViewChild("sellerHomeComponentModal") modal: ModalDirective;
  @ViewChild("sellerInputModal") sellerInputModal: SellerInputComponent;

  formSeller: FormGroup;
  active = false;
  saving = false;
  userWallet: UserWallet;
  pendingTransactions: any;
  userRequests: any;
  visible = true;
  listHistory = [];
  successfulList: String;
  isDisplay = true;
  isShow = true;
  // uname: any;

  userChoices: any[] = [
    { id: 0, displayName: "Abrica" },
    { id: 1, displayName: "Robusta" },
    { id: 2, displayName: "Culi" }
  ];

  constructor(private router: Router, private userInfo: UserInfoService, private updateBalanceService: UpdateBalanceService) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
  }

  ngOnInit(): void {
    /** Declare formgroup, formcontrol */
    this.formSeller = new FormGroup(
      {
        productName: new FormControl("", { validators: [Validators.required] }),
        productCode: new FormControl("", { validators: [Validators.required] }),
        expiry: new FormControl("", { validators: [Validators.required] }),
        manufacturingDate: new FormControl("", {
          validators: [Validators.required]
        }),
        soldDate: new FormControl("", { validators: [Validators.required] }),
        quantity: new FormControl("", { validators: [Validators.required] }),
        series: new FormControl("", { validators: [Validators.required] }),
        manufacturer: new FormControl("", { validators: [Validators.required] })
      },
      { updateOn: "change" }
    );
    this.getUserRequests();
    this.updateBalance(this.userWallet.walletId);
  }

  openInput(uRequests): void {
    this.sellerInputModal.show(uRequests);
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }

  getUserDetail(walletId: String): void {
    this.userInfo.showUserDetail(walletId).subscribe(userWallet => {
      this.userWallet = userWallet;
    });
  }

  updateBalance(walletId: String) {
    this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
      this.userWallet.balance = balance;
    });
  }

  getUserRequests(): void {
    this.userInfo.getUserRequests().subscribe(listRequest => {
      (this.userRequests = listRequest), console.log(93, this.userRequests);
    });
  }

  getListHistory() {
    console.log(103, this.userWallet.publicKey);
    this.userInfo.getHistory(this.userWallet.publicKey).subscribe(result => {
      this.listHistory = result;
    });
    this.isDisplay = !this.isDisplay;
  }

  getSuccessfulList() {
    this.userInfo
      .getSuccessfulList(this.userWallet.publicKey)
      .subscribe(succesfulList => {
        this.successfulList = succesfulList;
      });
    this.isShow = !this.isShow;
  }
}
