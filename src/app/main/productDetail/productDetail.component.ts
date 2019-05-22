import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';
import { debug } from 'util';
import Swal from 'sweetalert2';
import { UserInfoService } from 'src/app/services/user-info.service';

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
    dateSold: any;


    typeTransaction: String;
    detailByReq: any;
    detailByReq1: any;

    supplierName: String;
    sellerName: String;
    consumerName: String;

    constructor(
        private productService: ProductService,
        private userInfoService: UserInfoService
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
        // console.log(52, this.userWallet.publicKey, this.requestId)
        this.productService.trackDataForSeller(
            this.userWallet.publicKey,
            this.requestId
        ).subscribe(result => {
            console.log(64, result);
            if (result.type == "import") {
                this.typeTransaction = "Import";
                this.soldDateImport = result.transactedDate;
                this.detailForSeller = result.productInfoFromSupplier;

                this.userInfoService.getUsernameByPK(
                    result.supplierInfo
                ).subscribe(uName => {
                    this.supplierName = uName;
                })

                this.active = true;
                this.modal.show();
            } else if (result.type == "sell") {
                this.typeTransaction = "Sell";
                this.soldDateSell = result.transactedDate;
                this.detailByReq = result.productInfoFromSupplier;
                this.detailByReq1 = result.productInfoFromSeller;

                this.userInfoService.getUsernameByPK(
                    result.productInfoFromSupplier[0].productInfoFromSupplier.supplierInfo
                ).subscribe(uName => {
                    this.supplierName = uName;
                })

                this.userInfoService.getUsernameByPK(
                    result.consumerInfo
                ).subscribe(uName => {
                    this.consumerName = uName;
                })

                this.active = true;
                this.modal.show();
            } else if (result.type == "buy") {
                this.typeTransaction = "Sell";
                this.soldDateSell = result.transactedDate;
                this.detailByReq = result.productInfoFromSupplier;
                this.detailByReq1 = result.productInfoFromSeller;

                this.userInfoService.getUsernameByPK(
                    result.productInfoFromSupplier[0].productInfoFromSupplier.supplierInfo
                ).subscribe(uName => {
                    this.supplierName = uName;
                })

                this.active = true;
                this.modal.show();
            }
        })
    }

    getProductDetail(): void {
        // console.log(65, this.userWallet.publicKey, this.productCode)
        this.productService.trackDataForUser(
            this.productCode,
            this.userWallet.publicKey
        ).subscribe(result => {
            console.log(70, result);
            if (result.type == "oneSide") {
                this.typeTransaction = "Buy";

                // get supplier Name
                this.userInfoService.getUsernameByPK(
                    result.productInfoFromSupplier.supplierInfo
                ).subscribe(uName => {
                    console.log(117, uName)
                    this.supplierName = uName;
                });

                this.soldDateSell1 = result.productInfoFromSupplier.transactedDate;
                this.detailForUser = result.productInfoFromSupplier.productInfo;

                // show modal
                this.active = true;
                this.modal.show();
            } else if (result.type == "bothSide") {
                this.typeTransaction = "SellC";

                // get supplier Name
                this.userInfoService.getUsernameByPK(
                    result.productInfoFromSupplier.supplierInfo
                ).subscribe(uName => {
                    console.log(117, uName)
                    this.supplierName = uName;
                });

                // get seller name
                this.userInfoService.getUsernameByPK(
                    result.productInfoFromSeller.sellerInfo
                ).subscribe(uName => {
                    console.log(125, uName)
                    this.sellerName = uName;
                });
                // console.log(99, result.productInfoFromSupplier)
                // console.log(100, result.productInfoFromSeller)
                this.detailForUser1 = result.productInfoFromSeller.productInfo;
                this.detailForUser = result.productInfoFromSupplier.productInfo;
                this.soldDateImport1 = result.productInfoFromSupplier.transactedDate;

                this.active = true;
                this.modal.show();
            } else if (result.type == "error") {
                Swal.fire({
                    type: "error",
                    title: String(result.message)
                })
            }
        })
    }

    show(reqId: String, productCode: String): void {
        this.requestId = reqId;
        this.productCode = productCode;
        if (reqId == '' && productCode != '') {
            this.getProductDetail();
        } else if (reqId != '' && productCode == '') {
            this.getPackageDetail();
        }
    }

    close(): void {
        this.active = false;
        this.formProductDetail.reset();
        this.modal.hide();
    }

}
