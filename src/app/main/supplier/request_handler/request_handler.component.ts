import { OnInit, Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { SupplierInputComponent } from '../supplier-input/supplier-input.component';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { Table } from 'primeng/table';
import { SellerService } from 'src/app/services/seller.service';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';

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

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

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
    // total: Number;
    consignDetail: any;
    isChecked: boolean;

    walletBalance: UserWallet;

    requestObj: any;
    selectedConsignments: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userInfo: UserInfoService,
        private supplierSerivce: SupplierService
    ) {
        this.route.queryParamMap.subscribe(resp => {
            this.requestId = resp.get('requestId');
            this.productName = resp.get('productName');
            this.quantity = +resp.get('quantity');
            this.brand = resp.get('brand');

            this.requestObj = { 'requestId': this.requestId, 'productName': this.productName, 'quantity': this.quantity, 'brand': this.brand }
        })

        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
        console.log(41, this.userWallet)
    }

    ngOnInit(): void {
        console.log(57, this.requestId)
        /** Declare formgroup, formcontrol */
        this.formHandler = new FormGroup({
            requestId: new FormControl("", {}),
            productName: new FormControl("", {}),
            quantity: new FormControl("", {}),
            brand: new FormControl("", {}),
            isChecked: new FormControl("", {})
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

        this.supplierSerivce.getConsignmentDetail(
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            currentPageNumber
        )
            .subscribe(result => {
                console.log(89, result)
                this.primengTableHelper.records = result.pageList;
                this.primengTableHelper.totalRecordsCount = result.totalRecords;
                this.primengTableHelper.hideLoadingIndicator()
            })
    }

    submit(): void {
        console.log(125, this.selectedConsignments)
    }

    deleteSelectedRows(): void {
        if (this.selectedConsignments !== undefined) {
            if (this.selectedConsignments.length !== 0) {

                let removedCode = [];

                for (let i = 0; i < this.selectedConsignments.length; i++) {
                    removedCode.push(this.selectedConsignments[i].ProductCode);
                }

                this.supplierSerivce.deleteConsignment(JSON.stringify(removedCode))
                    .subscribe(e => {
                        this.reloadList();
                        Swal.fire({
                            type: 'success',
                            title: "Delete Successfully"
                        })
                    })
            }
        }

    }

    openInput(uRequests: any): void {
        this.supplierInputModal.show(uRequests)
    }

    close(): void {
        this.router.navigate(['supplier_home']);
    }

}
