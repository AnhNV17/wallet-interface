import { OnInit, Component, Injector, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { Router, NavigationExtras } from "@angular/router";
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
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
import { ProductDetailModalComponent } from '../../productDetail/productDetail.component';
import { ProductService } from 'src/app/services/product.service';
import { FormatStringComponent } from 'src/app/shared/ifichain/formatString.component';
import { ValidationComponent } from 'src/app/shared/ifichain/validation-messages.component';

export class SelectItem {
  id: number;
  displayName: String;
}

@Component({
  selector: "requesListModal",
  templateUrl: "./requestList.component.html",
  styleUrls: ["./requestList.component.css"],
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})
export class RequesListComponent implements OnInit {
  @ViewChild("requesListComponentModal") modal: ModalDirective;
  @ViewChild("sellerImportModal") sellerImportModal: SellerImportModalComponent;
  @ViewChild("sellerTransferModal") sellerTransferModal: SellerTransferModalComponent;
  @ViewChild("productDetailModal") productDetailModal: ProductDetailModalComponent;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('dataTable') dataTable: Table;

  @ViewChild('requestHandler') requestHandler: RequestHandlerComponent;

  formTrace: FormGroup;
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

  productCod: String;
  trackingResult: any;
  showError = false;

  trackingCode: String;

  typeSuccess: String;

  failList: any;
  showFail = true;

  constructor(
    private router: Router,
    private userInfo: UserInfoService,
    private sellerService: SellerService,
    private supplierSerivce: SupplierService,
    private updateBalanceService: UpdateBalanceService,
    private productService: ProductService
  ) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    console.log(48, this.userWallet)
    this.primengTableHelper = new PrimengTableHelper();
  }

  ngOnInit(): void {
    /** Declare formgroup, formcontrol */
    this.formTrace = new FormGroup(
      {
        trackingCode: new FormControl('', { validators: [ValidationComponent.checkCharacters, Validators.required] })
      },
      { updateOn: "change" }
    );

    this.updateBalance(this.userWallet.walletId);
  }

  openRequestHandler(requestId: String, username: String, productName: String, quantity: Number, brand: String, total: Number, userAddress: String): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'requestId': requestId, 'username': username, 'productName': productName, 'quantity': quantity, 'brand': brand, 'total': total, 'userAddress': userAddress },
      skipLocationChange: true
    };

    this.router.navigate(['request_handler'], navigationExtras)
  }

  updateBalance(walletId: String) {
    this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
      this.userWallet.balance = balance;
    });
  }

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
        this.userWallet.publicKey,
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
        this.userWallet.publicKey,
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

    this.userInfo.getFailList(
      this.userWallet.publicKey
    ).subscribe(result => {
      this.failList = result;
    });
    this.showFail = !this.showFail;

    this.isDisplay = true;
    this.isShow = true;
  }

  getListHistory() {
    this.userInfo.getHistory(this.userWallet.publicKey).subscribe(result => {
      this.listHistory = result;
    });
    this.isDisplay = !this.isDisplay;

    this.showFail = true;
    this.showRequest = true;
    this.isShow = true;
  }

  getSuccessfulList() {
    this.userInfo
      .getSuccessfulList(this.userWallet.publicKey)
      .subscribe(succesfulList => {
        console.log(185, succesfulList)
        this.successfulList = succesfulList;
        // this.typeSuccess = succesfulList.type;
      });
    this.isShow = !this.isShow;

    this.showFail = true;
    this.showRequest = true;
  }

  getTrackingCode(): void {
    this.formTrace.get('trackingCode').setValue(this.trackingCode);
  }

  uppercaseAll(e: any) {
    this.trackingCode = FormatStringComponent.vietHoa(e);
  }

  traceDataByCode(): void {
    let check = '';
    // let fControls = { trackingCode: FormControl }
    // for (var control in fControls) {
    if (this.formTrace.get('trackingCode').errors) {
      check = 'trackingCode';
      this.showError = true;
    }
    // }
    if (check != '') {
      // for (var control in fControls) {
      this.formTrace.get('trackingCode').markAsTouched({ onlySelf: true });
      // }
      $('#' + check).focus();
    } else {
      this.getTrackingCode();
      console.log(215, this.trackingCode)
      this.productDetailModal.show('', this.trackingCode);
    }
  }

  openDetail(reqId: String): void {
    this.productDetailModal.show(reqId, '');
  }

  openFailDetail(): void {
    this.productDetailModal.show('', '');
  }

  getFailList(): void {
    this.userInfo.getFailList(
      this.userWallet.publicKey
    ).subscribe(result => {
      this.failList = result;
    });
    this.showFail = !this.showFail;
  }

  trackingProduct(): void {
    this.productService.getProductInfo(this.productCod).subscribe(result => {
      this.trackingResult = result;
    })
  }
}
