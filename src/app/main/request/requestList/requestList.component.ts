import { OnInit, Component, Injector, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { Router, NavigationExtras } from "@angular/router";
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { SellerInputComponent } from '../../seller/seller-input/seller-input.component';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Table } from 'primeng/table';
import { UpdateBalanceService } from 'src/app/services/update-balance.service';
import { SellerService } from 'src/app/services/seller.service';
import { SellerImportModalComponent } from '../../seller/seller_import/seller-import.component';
import { SellerTransferModalComponent } from '../../seller/seller_transfer/seller-transfer.component';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { SupplierService } from 'src/app/services/supplier.service';
import { RequestHandlerComponent } from '../request_handler/request_handler.component';

export class SelectItem {
  id: number;
  displayName: String;
}

@Component({
  selector: "requesListModal",
  templateUrl: "./requestList.component.html",
  styleUrls: ["./requestList.component.css"],
  animations: [appModuleAnimation()]
})
export class RequesListComponent implements OnInit {
  @ViewChild("requesListComponentModal") modal: ModalDirective;
  @ViewChild("sellerInputModal") sellerInputModal: SellerInputComponent;
  @ViewChild("sellerImportModal") sellerImportModal: SellerImportModalComponent;
  @ViewChild("sellerTransferModal") sellerTransferModal: SellerTransferModalComponent;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('dataTable') dataTable: Table;

  @ViewChild('requestHandler') requestHandler : RequestHandlerComponent;

  formSeller: FormGroup;
  active = false;
  saving = false;
  userWallet: UserWallet;
  pendingTransactions: any;
  userRequests: any;
  visible = true;
  listHistory = [];
  successfulList: any;
  isDisplay = true;
  isShow = true;
  primengTableHelper: PrimengTableHelper;
  totalRecord: Number;
  listSellerRequest: any;
  showRequest = true;

  constructor(private router: Router, private userInfo: UserInfoService, private sellerService: SellerService, private supplierSerivce: SupplierService) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    console.log(48, this.userWallet)
    this.primengTableHelper = new PrimengTableHelper();
  }

  ngOnInit(): void {
    /** Declare formgroup, formcontrol */
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

  openRequestHandler(requestId: String, productName: String, quantity: Number, brand: String, total: Number, userAddress: String): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'requestId': requestId, 'productName': productName, 'quantity': quantity, 'brand': brand, 'total': total, 'userAddress': userAddress }
    };

    this.router.navigate(['request_handler'], navigationExtras)
  }

  // openInput(uRequests: any) {
  //   this.sellerInputModal.show(uRequests);
  // }

  openImportModal(): void {
    this.sellerImportModal.show();
  }

  openTransferModal(): void {
    this.sellerTransferModal.show();
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }

  // getUserRequests() {
  getUserRequests(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    if (isNaN(this.paginator.getPage())) {
      var pageNumber = 1;
    } else {
      pageNumber = this.paginator.getPage() + 1;
    }

    if (this.userWallet.role === "seller") {
      this.sellerService.getUserRequests(
        this.primengTableHelper.getMaxResultCount(this.paginator, event),
        pageNumber
      ).subscribe(listRequest => {
        console.log(107, listRequest)
        this.primengTableHelper.records = listRequest.pageList;
        this.primengTableHelper.totalRecordsCount = listRequest.totalRecords;
        this.primengTableHelper.hideLoadingIndicator()
      });
    } else if (this.userWallet.role === "supplier") {
      this.supplierSerivce.getSellerRequests(
        this.primengTableHelper.getMaxResultCount(this.paginator, event),
        pageNumber
      ).subscribe(result => {
        console.log(117, result)
        this.primengTableHelper.records = result.pageList,
          this.primengTableHelper.totalRecordsCount = result.totalRecords;
        this.primengTableHelper.hideLoadingIndicator();
      })
    }
  }

  reloadTable(): void {
    this.paginator.changePage(this.paginator.getPage());
    setTimeout(() => {
      this.getUserRequests();
    }, 0);

  }

  getRequest() {
    this.sellerService.getRequests(this.userWallet.publicKey)
    .subscribe(result => {
      console.log(145, result)
      this.listSellerRequest = result;
    });
    this.showRequest = !this.showRequest;
  }

  getListHistory() {
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
