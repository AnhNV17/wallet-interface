import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { Table } from 'primeng/components/table/table';
import { BuyService } from 'src/app/services/buy.service';
import { TransferService } from 'src/app/services/transfer.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { UpdateBalanceService } from 'src/app/services/update-balance.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
    selector: "sellerTransferModal",
    templateUrl: "./seller-transfer.component.html",
    styleUrls: ["./seller-transfer.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class SellerTransferModalComponent implements OnInit {
    @ViewChild('SellerTransferComponentModal') modal: ModalDirective;
    @Output() balanceUpdate: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('ReceiverOptions') receiverOptions: NgSelectComponent;

    userWallet: UserWallet;
    walletBalance: UserWallet;
    listRequest = [];
    listHistory = [];
    balance: Number;
    walletId: String;
    showError = false;

    active = false;
    successfulList: any;
    isShow = true;
    isDisplay = true;
    formSellerTransfer: FormGroup;

    amount: Number;
    receiver: String;
    real_balance: Number;

    transferingBtn = false;
    buyingBtn = false;
    showBuyError = false;
    showTransferError = false;

    primengTableHelper: PrimengTableHelper;
    dataBC: any;
    receiverAddress: String;

    listReceiver: any;

    constructor(
        private updateBalanceService: UpdateBalanceService,
        private transferService: TransferService,
        private userInfoService: UserInfoService,
        private router: Router
    ) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
        /** Declare formgroup, formcontrol */
        this.formSellerTransfer = new FormGroup({
            amount: new FormControl('', { validators: [Validators.required] }),
            receiver: new FormControl('', { validators: [Validators.required] })
        }, { updateOn: 'change' });

        this.updateBalance(this.userWallet.walletId);
        this.formSellerTransfer.reset();
        this.getAllUsers();
    }

    updateBalance(walletId: String) {
        this.updateBalanceService.updateBalance(walletId).subscribe(balance => {
            this.userWallet.balance = balance;
        });
    }

    getValueForTransfer() {
        this.formSellerTransfer.get('amount').setValue(this.amount);
        this.formSellerTransfer.get('receiver').setValue(this.receiverAddress);
    }

    getAllUsers(): void {
        let users = [];
        this.userInfoService.getAllUser().subscribe(result => {
            result.forEach(item => {
                users.push({id: item.publicKey, displayName: item.username});
            })
        }, () => {}, () => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].displayName == this.userWallet.username) {
                    users[i].disabled = true;
                }
            }
            this.listReceiver = users;
        })
    }

    transfer() {
        let check = '';
        let fControls = { amount: FormControl, receiver: FormControl }
        for (var control in fControls) {
            if (this.formSellerTransfer.get(control).errors) {
                check = control;
                this.showError = true;
                break;
            }
        }
        if (check != '') {
            for (var control in fControls) {
                this.formSellerTransfer.get(control).markAsTouched({ onlySelf: true });
            }
            $('#' + check).focus();
            if (check == 'receiver') {
                this.receiverOptions.focus();
            }
        } else {

            this.getValueForTransfer();
            if (this.amount && this.receiverAddress) {
                this.transferService
                    .transfer(this.amount, this.receiverAddress, this.userWallet.publicKey)
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

                        this.updateBalance(this.walletId);
                        this.updateListHistory();
                        this.balanceUpdate.emit(null);
                        this.formSellerTransfer.get("amount").reset();
                        this.formSellerTransfer.get("receiver").reset();
                    });
            } else {
                Swal.fire({
                    type: "warning",
                    text: "Please fill the form to transfer",
                })
            }

        }
    }

    show(): void {
        this.active = true;
        this.modal.show();
    }

    shown(): void {
        $('#amount').focus();
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

    close(): void {
        this.active = false;
        this.formSellerTransfer.reset();
        this.modal.hide();
    }

}
