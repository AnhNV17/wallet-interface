import { ModalDirective } from 'ngx-bootstrap';
import { Component, ViewChild, OnInit, ElementRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TransferCoinsService } from '../../services/charge.service';
import { UserInfoService } from '../../services/user-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserWallet } from '../../models/user-wallet';
import Swal from 'sweetalert2';

@Component({
    selector: 'chargeModal',
    templateUrl: './charge.component.html',
    styleUrls: ['./charge.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ChargeModalComponent implements OnInit {
    @ViewChild('chargeComponentModal') modal: ModalDirective;
    @ViewChild('amountInput') amountNativeElement: ElementRef;
    @Output() resetHistory: EventEmitter<any> = new EventEmitter<any>();

    formCharge: FormGroup;
    active = false;
    walletAdmin: UserWallet;
    amount: number;
    walletId: String;
    walletUser: any;
    username: String;

    constructor(private transferingCoins: TransferCoinsService, private userInfor: UserInfoService, ) {
        this.walletAdmin = JSON.parse(localStorage.getItem("userWallet"));
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formCharge = new FormGroup({
            amount: new FormControl('', { validators: [Validators.required] }),
            receiver: new FormControl()
        }, { updateOn: 'change' });
        this.getUserDetail(this.walletId)
    }

    getUserDetail(walletId: String): void {
        this.userInfor.showUserDetail(walletId)
            .subscribe(userWallet => { this.walletUser = userWallet });
    }

    transferCoins() {
        if (this.amount && this.walletUser.publicKey) {
            this.transferingCoins.transferCoins(this.amount, this.walletUser.walletId, this.walletUser.publicKey)
                .subscribe(result => {
                    Swal.fire({
                        type: 'success',
                        title: String(result.message)
                    })
                }, error => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: "The information you filled is not correct" + error,
                    })
                })
        } else {
            Swal.fire({
                type: 'error',
                text: "Please transfer again",
            })
        }
        this.formCharge.get('amount').reset();
    }

    shown() {
        this.amountNativeElement.nativeElement.focus();
    }

    show(wId: String, uname: String): void {
        this.username = uname;
        this.getUserDetail(wId);
        this.walletId = wId;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.resetHistory.emit(null);
        this.active = false;
        this.modal.hide();
        this.formCharge.reset();
    }

}