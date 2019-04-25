import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { SellerService } from 'src/app/services/seller.service';

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

    detailFrSeller: any;
    detailFrSupplier: any;

    constructor(
        private sellerService: SellerService
    ) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
        /** Declare formgroup, formcontrol */
        this.formProductDetail = new FormGroup({
        }, { updateOn: 'change' });

        this.formProductDetail.reset();
        this.getProductDetail();
    }

    getProductDetail(): void {
        this.sellerService.getUserRequests(5, 1).subscribe(result => {
            console.log(49, result.pageList)
            this.detailFrSeller = result.pageList;
        })

        if (this.userRole == "user") {

        }
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
