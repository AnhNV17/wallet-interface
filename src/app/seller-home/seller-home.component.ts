import { OnInit, Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { UserWallet } from '../models/user-wallet';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { SellerInputComponent } from './seller-input/seller-input.component';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: 'sellerHomeModal',
    templateUrl: './seller-home.component.html',
    styleUrls: ['./seller-home.component.css'],
    animations: [appModuleAnimation()]
})

export class SellerHomeComponent implements OnInit {
    @ViewChild('sellerHomeComponentModal') modal: ModalDirective;
    @ViewChild('sellerInputModal') sellerInputModal: SellerInputComponent;

    formSeller: FormGroup;
    active = false;
    saving = false;
    userWallet: UserWallet;
    pendingTransactions: any;

    userChoices: any[] = [
        { id: 0, displayName: "Tea" },
        { id: 1, displayName: "Coffee" },
        { id: 2, displayName: "Yogurt" },
    ];

    constructor(
        injector: Injector,
        private router: Router,
        private userInfo: UserInfoService
    ) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"))
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formSeller = new FormGroup({
            productName: new FormControl('', { validators: [Validators.required] }),
            productCode: new FormControl('', { validators: [Validators.required] }),
            expiry: new FormControl('', { validators: [Validators.required] }),
            manufacturingDate: new FormControl('', { validators: [Validators.required] }),
            soldDate: new FormControl('', { validators: [Validators.required] }),
            quantity: new FormControl('', { validators: [Validators.required] }),
            series: new FormControl('', { validators: [Validators.required] }),
            manufacturer: new FormControl('', { validators: [Validators.required] }),

        }, { updateOn: 'change' });
    }
    
    openInput(): void {
        this.sellerInputModal.show();
    }

    logout() {
        localStorage.removeItem("userWallet");
        this.router.navigate([""]);
    }

    getUserDetail(walletId: String): void {
        this.userInfo.showUserDetail(walletId)
            .subscribe(userWallet => { this.userWallet = userWallet });
    }

}