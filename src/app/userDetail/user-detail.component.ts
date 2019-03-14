import { ModalDirective } from 'ngx-bootstrap';
import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TransferCoinsService } from '../services/charge.service';
import { UserInfoService } from '../services/user-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
    selector: 'viewUserDetailModal',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class viewUserDetailModalComponent implements OnInit {
    @ViewChild('viewUserDetailModal') modal: ModalDirective;

    formView: FormGroup;
    active = false;
    listUser: any;
    listCharging: any;
    userWallet: any;
    amount: number;

    constructor(private userInfo: UserInfoService) {
        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formView = new FormGroup({
        }, { updateOn: 'change' });
    }

    getUserDetail(walletId: String): void {
        this.userInfo.showUserDetail(walletId)
            .subscribe(userWallet => { this.userWallet = userWallet });
    }

    show(): void {
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}