import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { BuyService } from 'src/app/services/buy.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { UpdateBalanceService } from 'src/app/services/update-balance.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
    selector: "sellerImportModal",
    templateUrl: "./seller-import.component.html",
    styleUrls: ["./seller-import.component.css"],
    encapsulation: ViewEncapsulation.None
})

export class SellerImportModalComponent implements OnInit {
    @ViewChild('SellerImportComponentModal') modal: ModalDirective;
    @ViewChild('UserOptions') userOptions: NgSelectComponent;
    @ViewChild('BrandOptions') brandOptions: NgSelectComponent;
    @ViewChild('SupplierOpts') supplierOpts: NgSelectComponent;

    userWallet: UserWallet;
    walletBalance: UserWallet;
    listRequest = [];
    listHistory = [];
    balance: Number;
    walletId: String;
    showError = false;

    active = false;

    selectItems: any[] = [
        { id: 0, displayName: "Abrica" },
        { id: 1, displayName: "Robusta" },
        { id: 2, displayName: "Culi" }
    ];

    cfBrands: any[] = [
        { id: 0, displayName: "Anhnv" },
        { id: 1, displayName: "Chinhmh" },
        { id: 2, displayName: "Vunt" },
    ];
    successfulList: any;
    isShow = true;
    isDisplay = true;
    formSellerImport: FormGroup;

    userChoice: any;
    buyQuantity: Number;
    real_balance: Number;
    selectedBrand: any;

    transferingBtn = false;
    buyingBtn = false;
    showBuyError = false;
    showTransferError = false;

    primengTableHelper: PrimengTableHelper;
    dataBC: any;

    supplierAddress: String;
    listSupplier: any;

    supplierName: String;

    constructor(
        private updateBalanceService: UpdateBalanceService,
        private buyService: BuyService,
        private userInfoService: UserInfoService,
        private sellerService: SellerService,
        private router: Router
    ) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
        /** Declare formgroup, formcontrol */
        this.formSellerImport = new FormGroup({
            userChoice: new FormControl('', { validators: [Validators.required] }),
            quantity: new FormControl('', { validators: [Validators.required] }),
            selectedBrand: new FormControl('', { validators: [Validators.required] }),
            supplier: new FormControl('', { validators: [Validators.required] })
        }, { updateOn: 'change' });

        this.updateBalance(this.userWallet.walletId);
        this.formSellerImport.reset();
        console.log(87, this.userWallet);
        this.getSuppliers();
    }

    getSuppliers(): void {
        let suppliers = [];
        this.userInfoService.getUserAsRole('supplier').subscribe(result => {
            result.forEach(item => {
                suppliers.push({ id: item.publicKey, displayName: item.username });
            })
        }, () => { }, () => {
            this.listSupplier = suppliers;
        })
    }

    updateBalance(walletId: String) {
        this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
            this.userWallet.balance = balance;
        });
    }

    getValueForBuy() {
        this.formSellerImport.get('userChoice').setValue(this.userChoice);
        this.formSellerImport.get('quantity').setValue(this.buyQuantity);
        this.formSellerImport.get('selectedBrand').setValue(this.selectedBrand);
        this.formSellerImport.get('supplier').setValue(this.supplierAddress);
        for (let i = 0; i < this.listSupplier.length; i++) {
            if (this.listSupplier[i].id == this.formSellerImport.get('supplier').value) {
                this.supplierName = this.listSupplier[i].displayName;
            }
        }
    }

    show(): void {
        this.active = true;
        this.modal.show();
    }

    shown(): void {
        this.userOptions.focus();
    }

    requestSupplier() {
        let check = '';
        let fControls = { userChoice: FormControl, quantity: FormControl, selectedBrand: FormControl, supplier: FormControl }
        for (var control in fControls) {
            if (this.formSellerImport.get(control).errors) {
                check = control;
                this.showError = true;
                break;
            }
        }
        if (check != '') {
            for (var control in fControls) {
                this.formSellerImport.get(control).markAsTouched({ onlySelf: true });
            }
            $('#' + check).focus();
            if (check == 'userChoice') {
                this.userOptions.focus();
            } else if (check == 'selectedBrand') {
                this.brandOptions.focus();
            } else if (check == 'supplier') {
                this.supplierOpts.focus();
            }
        } else {

            this.getValueForBuy();
            console.log(134, this.supplierName)
            if (this.buyQuantity && this.userChoice && this.selectedBrand) {
                this.sellerService
                    .requestToSuppliers(
                        this.userWallet.username,
                        this.userChoice,
                        this.buyQuantity,
                        this.userWallet.publicKey,
                        this.selectedBrand,
                        this.supplierAddress,
                        this.supplierName
                    )
                    .subscribe(result => {
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
                    });
                this.showError = false;
                this.updateBalance(this.userWallet.walletId);
                this.updateListHistory();
                this.close();
            } else {
                Swal.fire({
                    type: "warning",
                    text: "Please fill the form to transfer",
                })
            }
        }
    }

    getSuccessfulList() {
        this.userInfoService
            .getSuccessfulList(this.userWallet.publicKey)
            .subscribe(succesfulList => {
                this.successfulList = succesfulList;
            });
        this.isShow = !this.isShow;
        this.updateBalance(this.userWallet.walletId);
    }

    updateListHistory() {
        this.userInfoService.getListHistory(this.userWallet.publicKey)
            .subscribe(result => { this.listHistory = result });
    }

    getListHistory() {
        this.userInfoService.getListHistory(this.userWallet.publicKey)
            .subscribe(result => { this.listHistory = result });
        this.isDisplay = !this.isDisplay;
    }

    //   getRequests() {
    //     this.userInfoService.getRequestList(this.userWallet.publicKey)
    //       .subscribe(result => { this.listRequest = result });
    //     this.isDisplay = !this.isDisplay;
    //   }

    close(): void {
        this.active = false;
        this.formSellerImport.reset();
        this.modal.hide();
    }

}
