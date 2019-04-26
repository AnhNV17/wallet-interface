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
    detailForSeller: any;
    soldDate: any;

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
            this.detailForSeller = result.infoProductFromSupplier;
        })
    }

    getProductDetail(): void {
        this.productService.trackDataForUser(
            'CVX',
            '04ec8747d3935dae79b0ab59c2c904965265f72be807edc6974cf29fa1d0e464cbafa3bca69d42f2bceeeee2166d990f49320a982d66185b5295042634b9cf02de'
        ).subscribe(result => {
            console.log(74, result);
            this.detailForUser = result;
        })
    }

    show(reqId: String): void {
        console.log(72, reqId)
        this.requestID = reqId;
        this.getPackageDetail();
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.formProductDetail.reset();
        this.modal.hide();
    }

}
