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

    userRole: String;

    detailForUser: any;
    detailForSeller: any;

    constructor(
        private sellerService: SellerService,
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
        this.getPackageDetail();
        this.getProductDetail();
    }

    getPackageDetail(): void {
        this.productService.trackDataForSeller(
            '049c9b39950a9de25d8cfd9fecaa97d969770ba89472e1831b689865c069531a010555ae3ff3096896722b8cdbcbe3f717f869c1912269edfa42f61480264a92fb',
            '6f7bc9b0-6757-11e9-ba04-17a1cb04c825'
        ).subscribe(result => {
            console.log(64, result);
            this.detailForSeller = result;
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

    show(role: String): void {
        this.userRole = role;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.formProductDetail.reset();
        this.modal.hide();
    }

}
