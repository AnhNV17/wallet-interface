import { OnInit, Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { Table } from 'primeng/table';
import { SellerService } from 'src/app/services/seller.service';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { SupplierInputComponent } from '../../supplier/supplier-input/supplier-input.component';
// import { SupplierInputComponent } from '../../supplier/supplier-input/supplier-input.component';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: "requestHandler",
    templateUrl: "./request_handler.component.html",
    styleUrls: ["./request_handler.component.css"],
    animations: [appModuleAnimation()]
})
export class RequestHandlerComponent implements OnInit {

    @ViewChild("supplierInputModal") supplierInputModal: SupplierInputComponent;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('dataTable') dataTable: Table;

    formHandler: FormGroup;
    active = false;
    saving = false;
    userWallet: UserWallet;
    // visible = true;
    isDisplay = true;
    isShow = true;
    sellerRequest: any;
    primengTableHelper: PrimengTableHelper;
    requestId: String;
    productName: String;
    quantity: Number;
    brand: String;
    total: Number;
    consignDetail: any;
    userAdd: String;

    mess: string;

    walletBalance: UserWallet;

    requestObj: any;
    selectedConsignments: any;
    userAddress: String;

    consingmentDetail: any;

    testResult: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private supplierSerivce: SupplierService,
        private sellerService: SellerService
    ) {
        this.route.queryParamMap.subscribe(resp => {
            this.requestId = resp.get('requestId');
            this.productName = resp.get('productName');
            this.quantity = +resp.get('quantity');
            this.brand = resp.get('brand');
            this.total = +resp.get('total');
            this.userAdd = resp.get('userAddress');

            this.requestObj = { 'requestId': this.requestId, 'productName': this.productName, 'quantity': this.quantity, 'brand': this.brand, 'total': this.total, 'userAdd': this.userAdd }
            console.log(72, this.requestObj)
        })
        console.log(73, this.requestObj);
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
        console.log(41, this.userWallet)
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formHandler = new FormGroup({
            requestId: new FormControl("", {}),
            productName: new FormControl("", {}),
            quantity: new FormControl("", {}),
            brand: new FormControl("", {}),
            total: new FormControl("", {})
        }, { updateOn: "change" });
        this.formHandler.disable();
    }

    reloadList(): void {
        this.paginator.changePage(this.paginator.getPage());
        setTimeout(() => {
            this.getConsignmentDetail();
        }, 0);
    }

    getConsignmentDetail(event?: LazyLoadEvent): void {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        if (isNaN(this.paginator.getPage())) {
            var currentPageNumber = 1;
        } else {
            currentPageNumber = this.paginator.getPage() + 1;
        }

        if (this.userWallet.role == "supplier") {
            this.supplierSerivce.getConsignmentDetail(
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                currentPageNumber
            ).subscribe(result => {
                console.log(119, result)
                this.primengTableHelper.records = result.pageList;
                this.primengTableHelper.totalRecordsCount = result.totalRecords;
                this.primengTableHelper.hideLoadingIndicator()
            })
        } else if (this.userWallet.role == "seller") {
            this.sellerService.getBill(
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                currentPageNumber,
                this.userWallet.publicKey,
                this.requestObj.productName
            ).subscribe(result => {
                console.log(136, result.pageList)
                this.primengTableHelper.records = result.pageList;
                this.primengTableHelper.totalRecordsCount = result.totalRecords;
                this.primengTableHelper.hideLoadingIndicator();
            })
        }
    }

    submit(): void {
        console.log(127, this.userWallet);
        if (this.requestObj != null && this.selectedConsignments !== undefined) {
            if (this.selectedConsignments.length !== 0) {
                if (this.userWallet.role == "supplier") {
                    this.supplierSerivce.createTransaction(this.requestObj.requestId, this.requestObj.userAdd, this.userWallet.publicKey, this.selectedConsignments)
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
                            this.reloadList();

                            // remove params
                            this.router.navigate(['request_handler'], { queryParams: null });
                        });
                } else if (this.userWallet.role == "seller") {
                    console.log(165, this.selectedConsignments, this.userWallet.publicKey, this.requestObj.userAdd)
                    this.sellerService.createTransaction(
                        this.requestObj.requestId,
                        this.requestObj.productName,
                        this.selectedConsignments,
                        this.requestObj.userAdd,
                        this.userWallet.publicKey,
                        this.requestObj.total
                    ).subscribe(result => {
                        if (result.typeMess == "success") {
                            Swal.fire({
                                type: "info",
                                title: String(result.message)
                            })
                        } else if (result.typeMess == "error") {
                            Swal.fire({
                                type: 'error',
                                title: String(result.message)
                            })
                        }
                    })
                }
            } else {
                Swal.fire({
                    type: "warning",
                    title: "Request - null or Consignment - not checked!"
                });
            }
        } else {
            Swal.fire({
                type: "warning",
                title: "Request - null or Consignment - not checked!"
            });
        }
    }

    deleteSelectedRows(): void {
        if (this.selectedConsignments !== undefined) {
            if (this.selectedConsignments.length !== 0) {

                let removedCode = [];

                for (let i = 0; i < this.selectedConsignments.length; i++) {
                    removedCode.push(this.selectedConsignments[i].ProductCode);
                }

                this.supplierSerivce.deleteConsignment(JSON.stringify(removedCode))
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
                        this.reloadList();
                    })
            }
        }

    }

    openInput(uRequests: any): void {
        this.supplierInputModal.show(uRequests);
    }

    close(): void {
        if (this.userWallet.role === "supplier") {
            this.router.navigate(['requestList']);
        } else if (this.userWallet.role === "seller") {
            this.router.navigate(['requestList']);
        }
    }

}
