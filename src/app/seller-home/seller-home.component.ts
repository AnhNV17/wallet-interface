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
import { PrimengTableHelper } from '../../shared/helpers/tableHelper';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
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
  @ViewChild('paginator') paginator: Paginator;

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
  primengTableHelper: PrimengTableHelper;
  maxRows = 3;
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
    // this.getUserRequests();
    this.formSeller = new FormGroup(
      {
        productName: new FormControl("", { validators: [Validators.required] }),
        productCode: new FormControl("", { validators: [Validators.required] }),
        quantity: new FormControl("", { validators: [Validators.required] }),
        series: new FormControl("", { validators: [Validators.required] })
      },
      { updateOn: "change" }
    );
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

  getUserRequests() {
    // getUserRequests(event?: LazyLoadEvent): void {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //   this.paginator.changePage(0);
    //   return;
    // }

    // this.primengTableHelper.showLoadingIndicator();

    this.userInfo.getUserRequests().subscribe(listRequest => {
      // this.primengTableHelper.records = listRequest;

      this.userRequests = listRequest
    });
  }

  reloadTable(): void {
    // this.paginator.changePage(this.paginator.getPage());
    // console.log("in")
    // console.log(105, this.router.url)
    // this.router.navigate(["/seller_home"]);
    // this.getUserRequests();
    setTimeout(() => {
      this.getUserRequests();
    }, 0);

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
