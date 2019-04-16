import { OnInit, Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { appModuleAnimation } from "shared/animations/routerTransition";
import { Router, NavigationExtras } from "@angular/router";
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { SupplierInputComponent } from '../supplier-input/supplier-input.component';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { Table } from 'primeng/table';
import { SellerService } from 'src/app/services/seller.service';
import { SupplierService } from 'src/app/services/supplier.service';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: "supplierHomeModal",
    templateUrl: "./supplier-home.component.html",
    styleUrls: ["./supplier-home.component.css"],
    animations: [appModuleAnimation()]
})
export class SupplierHomeComponent implements OnInit {
    @ViewChild("supplierHomeComponentModal") modal: ModalDirective;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('dataTable') dataTable: Table;

    formSupplier: FormGroup;
    active = false;
    saving = false;
    userWallet: UserWallet;
    listHistory = [];
    successfulList: any;
    // visible = true;
    isDisplay = true;
    isShow = true;
    sellerRequest: any;
    primengTableHelper: PrimengTableHelper;

    constructor(private router: Router, private userInfo: UserInfoService, private supplierSerivce: SupplierService) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
        console.log(41, this.userWallet)
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formSupplier = new FormGroup(
            {
                productName: new FormControl("", { validators: [Validators.required] }),
                productCode: new FormControl("", { validators: [Validators.required] }),
                quantity: new FormControl("", { validators: [Validators.required] }),
                series: new FormControl("", { validators: [Validators.required] })
            },
            { updateOn: "change" }
        );
        this.getSellerRequests();
    }

    logout() {
        localStorage.removeItem("userWallet");
        this.router.navigate([""]);
    }

    getSellerRequests(event?: LazyLoadEvent): void {
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

        this.supplierSerivce.getSellerRequests(
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            currentPageNumber
        )
            .subscribe(result => {
                console.log(89, result)
                this.primengTableHelper.records = result.pageList,
                    this.primengTableHelper.totalRecordsCount = result.totalRecords;
                this.primengTableHelper.hideLoadingIndicator();
            })
    }

    reloadTable(): void {
        this.paginator.changePage(this.paginator.getPage());
        setTimeout(() => {
            this.getSellerRequests();
        }, 0);
    }

    // Show ProductInforAttribute
    openRequestHandler(requestId: String, productName: String, quantity: Number, brand: String, total: Number): void {
        // this.dataTableForViewModal.receiver(inforId);

        let navigationExtras: NavigationExtras = {
            queryParams: { 'requestId': requestId, 'productName': productName, 'quantity': quantity, 'brand': brand }
        };

        this.router.navigate(['supplier_handler'], navigationExtras)
    }
    getListHistory() {
        // console.log(103, this.userWallet.publicKey);
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