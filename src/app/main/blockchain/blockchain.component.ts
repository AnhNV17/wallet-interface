import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UserWallet } from "../../models/user-wallet";
import { UserInfoService } from "../../services/user-info.service";
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: "blockchain",
    templateUrl: "./blockchain.component.html",
    styleUrls: ["./blockchain.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class BlockchainComponent implements OnInit {
    @ViewChild('blockchain') modal: ModalDirective;

    userWallet: UserWallet;
    walletBalance: UserWallet;
    listRequest = [];
    listHistory = [];
    balance: Number;
    walletId: String;
    showError = false;

    simpleItems = [];
    successfulList = [];
    isShow = true;
    isDisplay = true;
    formHome: FormGroup;

    blockchain: any;

    transactions: String;

    constructor(
        private userInfoService: UserInfoService
    ) {
    }

    ngOnInit() {
        /** Declare formgroup, formcontrol */
        // this.formHome = new FormGroup({
        //     userChoice: new FormControl('', { validators: [Validators.required] }),
        //     quantity: new FormControl('', { validators: [Validators.required] }),
        //     seller: new FormControl('', { validators: [Validators.required] }),
        //     amount: new FormControl('', { validators: [Validators.required] }),
        //     receiver: new FormControl('', { validators: [Validators.required] }),
        //     trackingCode: new FormControl('', { validators: [ValidationComponent.checkCharacters, Validators.required] })
        // }, { updateOn: 'change' });
        this.getBlocks();
    }

    getBlocks(): void {
        this.userInfoService.getBlockchain().subscribe(result => {
            console.log(64, result);
            this.blockchain = result;
            if (result != null) {
                for (let i = 0; i < result.length; i++) {
                    this.transactions = JSON.stringify(result[i]);
                }
            }
        }) 
    }

}
