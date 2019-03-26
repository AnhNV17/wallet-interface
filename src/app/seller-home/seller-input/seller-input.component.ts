import { OnInit, Component, Injector, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DateTimeComponent } from 'src/app/shared/ifichain/datetime.component';
import * as $ from 'jquery';
import { ProductInfor } from 'src/app/models/productInfor';
import { SellerService } from 'src/app/services/seller.service';
import { UserWallet } from 'src/app/models/user-wallet';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: 'sellerInputModal',
    templateUrl: './seller-input.component.html',
    styleUrls: ['./seller-input.component.css'],
    animations: [appModuleAnimation()]
})

export class SellerInputComponent implements OnInit {
    @ViewChild('sellerInputComponentModal') modal: ModalDirective;
    @ViewChild('sampleDatePickerManDate') sampleDatePickerManDate: ElementRef;
    @ViewChild('SampleDatePickerExpiry') SampleDatePickerExpiry: ElementRef;
    @Output() resetList: EventEmitter<any> = new EventEmitter<any>();

    formSeller: FormGroup;
    active = false;
    saving = false;
    showError = false;
    isShowCalendar = 'hide';
    requestId: String;
    productInfor: ProductInfor;
    userRequest: any;
    walletBalance: UserWallet;
    productCode: String;
    expiry: Date;
    manufacturingDate: Date;
    soldDate: Date;
    series: String;
    manufacturer: String;

    userChoices: any[] = [
        { id: 0, displayName: "Coffee-1" },
        { id: 1, displayName: "Coffee-2" },
        { id: 2, displayName: "Coffee-3" },
        { id: 3, displayName: "Coffee-4" },
        { id: 4, displayName: "Coffee-5" },
        { id: 5, displayName: "Coffee-6" }
    ];

    constructor(
        injector: Injector,
        private sellerService: SellerService,
    ) {
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formSeller = new FormGroup({
            // productName: new FormControl('', { }),
            productCode: new FormControl('', { validators: [Validators.required] }),
            expiry: new FormControl('', {}),
            manufacturingDate: new FormControl('', {}),
            soldDate: new FormControl('', {}),
            series: new FormControl('', { }),
            manufacturer: new FormControl('', {}),

        }, { updateOn: 'change' });

        // $('#manufacturingDate').datetimepicker({

        //     format: 'DD/MM/YYYY'
        // });

        // $('.datepicker').datepicker({
        //     startDate: '-3d'
        // });  
        // this.productInfor;
        // this.userRequest.username;
    }

    // formatDate() {
    //     DateTimeComponent.formatFullDate(this.sampleDatePickerManDate);
    //     DateTimeComponent.formatFullDate(this.SampleDatePickerExpiry);
    // }

    // showCalendar() {
    //     // $(document).ready(function () {
    //     //     this.isShowCalendar = !this.isShowCalendar;
    //     // $('#manufacturingDate').datetimepicker(this.isShowCalendar ? 'show' : 'hide');
    //     $('#manufacturingDate').datetimepicker({
    //         format: 'LT'
    //     });
    //     // });
    // }

    /** show data when modal is shown */
    show(requests: any): void {
        this.userRequest = requests;
        console.log(88, this.userRequest.username)
        this.active = true;
        this.modal.show();
    }

    shown() {
        $('#productCode').focus();
    }

    getValueForSave() {
        // this.formSeller.get('productName').setValue(this.productInfor.productName);
        this.formSeller.get('productCode').setValue(this.productCode);
        this.formSeller.get('expiry').setValue(this.expiry);
        this.formSeller.get('manufacturingDate').setValue(this.manufacturingDate);
        this.formSeller.get('soldDate').setValue(this.soldDate);
        this.formSeller.get('series').setValue(this.series);
        this.formSeller.get('manufacturer').setValue(this.manufacturer);
    }

    /**
     * save data for ProductInforAttributes
     */
    save(): void {
        let check = '';
        for (var control in this.formSeller.controls) {
            if (this.formSeller.get(control).errors) {
                check = control;
                this.showError = true;
                break;
            }
        }
        if (check != '') {
            for (var control in this.formSeller.controls) {
                this.formSeller.get(control).markAsTouched({ onlySelf: true });
            }
            $('#' + check).focus();
            // if (check == 'productName')
            //     this.ProductName.focus();
        } else {
            this.getValueForSave();
            this.sellerService.createTransaction(this.userRequest.productName, this.productCode, this.series, this.manufacturer, this.userRequest.seller, this.userRequest.userAddress, this.userRequest.total)
                .subscribe(balance => {
                    this.walletBalance = balance;
                    alert(this.walletBalance.message);
                });
            // alert('successfully');
            this.showError = false;
            // this.saving = true;
            this.close();
        }
    }

    /** close modal and reset form */
    close(): void {
        this.resetList.emit(null);
        this.active = false;
        this.modal.hide();
        this.formSeller.reset();
    }

}