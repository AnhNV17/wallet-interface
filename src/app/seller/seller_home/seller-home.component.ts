import { OnInit, Component, Injector, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { appModuleAnimation } from "shared/animations/routerTransition";
import { Router } from "@angular/router";
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { SellerInputComponent } from '../seller-input/seller-input.component';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Table } from 'primeng/table';
import { UpdateBalanceService } from 'src/app/services/update-balance.service';

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
  @ViewChild('dataTable') dataTable: Table;

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
  totalRecord: Number;


  constructor(private router: Router, private userInfo: UserInfoService, private updateBalanceService: UpdateBalanceService) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    this.primengTableHelper = new PrimengTableHelper();
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

  openInput(uRequests: any): void {
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

  // getUserRequests() {
  getUserRequests(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();
    // console.log(this.paginator.getPageCount());
    console.log(this.paginator)
    
    this.userInfo.getUserRequests(
      this.primengTableHelper.getMaxResultCount(this.paginator, event),
      this.paginator.getPage() + 1
    ).subscribe(listRequest => {
      this.primengTableHelper.records = listRequest.pageList;
      this.primengTableHelper.totalRecordsCount = listRequest.totalRecords;
      this.primengTableHelper.hideLoadingIndicator()
    });
  }

  reloadTable(): void {
    this.paginator.changePage(this.paginator.getPage());
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
