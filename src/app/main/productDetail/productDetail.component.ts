import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';

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

    requestID: String;

    detailForUser: any;
    detailForUser1: any;
    detailForSeller: any;
    soldDate: any;
    soldDate1: any;

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
        // this.getPackageDetail();
        // this.getProductDetail();
    }

    getPackageDetail(): void {
        console.log(52, this.userWallet.publicKey, this.requestID)
        this.productService.trackDataForSeller(
            this.userWallet.publicKey,
            this.requestID
        ).subscribe(result => {
            console.log(64, result);
            this.soldDate = result.transactedDate;
            this.detailForSeller = result.productInfoFromSupplier;
        })
    }

    getProductDetail(): void {
        console.log(65, this.userWallet.publicKey)
        this.productService.trackDataForUser(
            'A001',
            this.userWallet.publicKey
        ).subscribe(result => {
            console.log(70, result.productInfoFromSupplier.productInfo);
            console.log(71, result.productInfoFromSeller.productInfo);
            this.soldDate = result.productInfoFromSupplier.transactedDate;
            this.soldDate1 = result.productInfoFromSeller.transactedDate;
            this.detailForUser = result.productInfoFromSupplier.productInfo;
            this.detailForUser1 = result.productInfoFromSeller.productInfo;
        })
    }

    show(reqId: String): void {
        console.log(72, reqId)
        console.log(77, this.userWallet.role)
        this.requestID = reqId;
        if (this.userWallet.role == "seller") {
            this.getPackageDetail();
        } else if (this.userWallet.role == "user") {
            this.getProductDetail();
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
