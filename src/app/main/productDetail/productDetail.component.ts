import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';
import { debug } from 'util';
import Swal from 'sweetalert2';

@Component({
    selector: "productDetailModal",
    templateUrl: "./productDetail.component.html",
    styleUrls: ["./productDetail.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class ProductDetailModalComponent implements OnInit {
    @ViewChild('ProductDetailComponentModal') modal: ModalDirective;

    userWallet: UserWallet;

    active = false;
    successfulList: any;
    isShow = true;
    isDisplay = true;
    formProductDetail: FormGroup;

    primengTableHelper: PrimengTableHelper;

    requestId: String;
    productCode: String;

    detailForUser: any;
    detailForUser1: any;
    detailForSeller: any;
    detailForSeller1: any;
    detailForSeller2: any;
    soldDateImport: any;
    soldDateSell: any;
    soldDateSell1: any;
    soldDateImport1: any;


    typeTransaction: String;
    detailByReq: any;
    detailByReq1: any;

    constructor(
        private productService: ProductService
    ) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        console.log(38, this.userWallet)
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
        /** Declare formgroup, formcontrol */
        this.formProductDetail = new FormGroup({
        }, { updateOn: 'change' });

        this.formProductDetail.reset();
    }

    getPackageDetail(): void {
        console.log(52, this.userWallet.publicKey, this.requestId)
        this.productService.trackDataForSeller(
            this.userWallet.publicKey,
            this.requestId
        ).subscribe(result => {
            console.log(64, result);
            if (result.type == "import") {
                this.typeTransaction = "Import";
                this.soldDateImport = result.transactedDate;
                this.detailForSeller = result.productInfoFromSupplier;
            } else if (result.type == "sell") {
                this.typeTransaction = "Sell";
                this.soldDateSell = result.transactedDate;
                this.detailByReq = result.productInfoFromSupplier;
                this.detailByReq1 = result.productInfoFromSeller;
            }
        })
    }

    getProductDetail(): void {
        console.log(65, this.userWallet.publicKey, this.productCode)
        this.productService.trackDataForUser(
            this.productCode,
            this.userWallet.publicKey
        ).subscribe(result => {
            console.log(70, result);
            if (result.type == "oneSide") {
                this.typeTransaction = "Buy";
                this.soldDateSell1 = result.productInfoFromSupplier.transactedDate;
                this.detailForUser = result.productInfoFromSupplier.productInfo;
            } else if (result.type == "bothSide") {
                this.typeTransaction = "SellC";
                console.log(99, result.productInfoFromSupplier)
                console.log(100, result.productInfoFromSeller)
                this.detailForUser1 = result.productInfoFromSeller.productInfo;
                this.detailForUser = result.productInfoFromSupplier.productInfo;
                this.soldDateImport1 = result.productInfoFromSupplier.transactedDate;
            }
        })
    }

    show(reqId: String, productCode: String): void {
        console.log(72, reqId, productCode)
        console.log(77, this.userWallet.role)
        this.requestId = reqId;
        this.productCode = productCode;
        if (reqId == '' && productCode != '') {
            this.getProductDetail();
        } else if (reqId != '' && productCode == '') {
            this.getPackageDetail();
        }
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.formProductDetail.reset();
        this.modal.hide();
    }

}
