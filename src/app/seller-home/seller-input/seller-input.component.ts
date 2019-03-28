import { OnInit, Component, Injector, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { DateTimeComponent } from 'src/app/shared/ifichain/datetime.component';
import * as $ from 'jquery';
import { ProductInfor } from 'src/app/models/productInfor';
import { SellerService } from 'src/app/services/seller.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import * as moment from 'moment';
import { FormatStringComponent } from 'src/app/shared/ifichain/formatString.component';
import Swal from 'sweetalert2';
import { ShareFuncComponent } from 'src/app/shared/ifichain/sharedFunc.component';
import { ValidationComponent } from 'src/app/shared/ifichain/validation-messages.component';

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
    @ViewChild('dpManDate') dpManDate: ElementRef;
    @ViewChild('dpExpiry') dpExpiry: ElementRef;
    @ViewChild('dpSoldDate') dpSoldDate: ElementRef;
    @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
    @Output() resetList: EventEmitter<any> = new EventEmitter<any>();

    formSeller: FormGroup;
    active = false;
    saving = false;
    showError = false;
    isShowCalendar = false;
    requestId: String;
    productInfor: ProductInfor;
    userRequest: any;
    walletBalance: UserWallet;

    productCode: String;
    manufacturingDate: String;
    expiry: String;
    soldDate: String;
    series: String;
    manufacturer: String;

    format = 'dd/mm/yyyy';

    dpOptions: INgxMyDpOptions = {
        // todayBtnTxt: 'Today',
        dateFormat: 'dd/mm/yyyy',
    };

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
            productCode: new FormControl('', { validators: [Validators.required] }),
            manufacturingDate: new FormControl('', { validators: [Validators.required] }),
            expiry: new FormControl('', { validators: [Validators.required] }),
            soldDate: new FormControl('', { validators: [Validators.required] }),
            series: new FormControl('', {}),
            manufacturer: new FormControl('', {}),

        }, { updateOn: 'change' });
    }

    uppercaseAll(e: any) {
        this.productCode = FormatStringComponent.vietHoa(e);
    }

    validStartEnd(st: any, en: any) {
        const $el = this;
        try {
            // console.log(109, st, en)
            if (st != '' && en != '') {
                var Start = moment(st, "DD/MM/YYYY");
                var End = moment(en, "DD/MM/YYYY");

                debugger

                if (Start > End) {
                    if ($el.formSeller.get('manufacturingDate').touched) {
                        $el.formSeller.get('manufacturingDate').setErrors({ isStartMax: true });
                        $el.formSeller.get('expiry').setErrors(null);
                        $el.formSeller.get('manufacturingDate').markAsTouched({ onlySelf: true });
                    } else if ($el.formSeller.get('expiry').touched) {
                        $el.formSeller.get('expiry').setErrors({ isEndMin: true });
                        $el.formSeller.get('expiry').markAsTouched({ onlySelf: true });
                        $el.formSeller.get('manufacturingDate').setErrors(null);
                    }
                    // return;
                }
                else {
                    $el.formSeller.get('expiry').setErrors(null);
                    $el.formSeller.get('manufacturingDate').setErrors(null);
                }
            }
            // }
        } catch (error) {

        }
    }

    validSoldDate(st: any, end: any, btw: any) {
        try {


            if (st !== '' && end !== '' && btw !== '') {

                var startDate = moment(st, 'DD/MM/YYYY');
                var endDate = moment(end, 'DD/MM/YYYY');
                var btwDate = moment(btw, 'DD/MM/YYYY');

                debugger

                if (btwDate < startDate) {
                    if (this.formSeller.get('soldDate').touched) {
                        console.log("isEndMin")
                        this.formSeller.get('soldDate').setErrors({ isEndMin: true });
                        this.formSeller.get('manufacturingDate').setErrors(null);
                        this.formSeller.get('soldDate').markAsTouched({ onlySelf: true });
                    } else if (this.formSeller.get('manufacturingDate').touched) {
                        this.formSeller.get('manufacturingDate').setErrors({ isEndMin: true });
                        this.formSeller.get('manufacturingDate').markAsTouched({ onlySelf: true });
                        this.formSeller.get('soldDate').setErrors(null);
                    }
                    // return null;
                } else if (btwDate > endDate) {
                    if (this.formSeller.get('soldDate').touched) {
                        console.log("isStartMax")
                        this.formSeller.get('soldDate').setErrors({ isStartMax: true });
                        this.formSeller.get('expiry').setErrors(null);
                        this.formSeller.get('soldDate').markAsTouched({ onlySelf: true });
                    } else if (this.formSeller.get('expiry').touched) {
                        this.formSeller.get('expiry').setErrors({ isEndMin: true });
                        this.formSeller.get('expiry').markAsTouched({ onlySelf: true });
                        this.formSeller.get('soldDate').setErrors(null);
                    }
                } else {
                    this.formSeller.get('soldDate').setErrors(null);
                    this.formSeller.get('manufacturingDate').setErrors(null);
                    this.formSeller.get('expiry').setErrors(null);
                }
            }
        } catch (error) {

        }
    }

    onDateChangedTest(e: IMyDateModel, e1: IMyDateModel): void {
        if (e !== undefined && e1 !== undefined) {
            this.manufacturingDate = e.formatted;
            this.formSeller.patchValue({ manufacturingDate: e.formatted });

            this.manufacturingDate = e1.formatted;
            this.formSeller.patchValue({ manufacturingDate: e1.formatted });
            console.log(142, this.formSeller.get('manufacturingDate').value, this.formSeller.get('expiry').value);
            this.validStartEnd(this.formSeller.get('manufacturingDate').value, this.formSeller.get('expiry'));
        }
    }


    onDateChanged(event: IMyDateModel): void {
        this.manufacturingDate = event.formatted;
        this.formSeller.patchValue({ manufacturingDate: event.formatted });

        let start = this.formSeller.get('manufacturingDate').value;
        let end = this.formSeller.get('expiry').value;
        // console.log(142, this.formSeller.get('manufacturingDate').value, this.formSeller.get('expiry').value);
        if (start !== '' && end !== '') {
            this.validStartEnd(this.manufacturingDate, this.expiry);
        }
    }

    onDateChanged1(event: IMyDateModel): void {
        this.expiry = event.formatted;
        this.formSeller.patchValue({ expiry: event.formatted })

        let start = this.formSeller.get('manufacturingDate').value;
        let end = this.formSeller.get('expiry').value;
        // console.log(172, this.formSeller.get('manufacturingDate').value, this.formSeller.get('expiry').value);
        // console.log(143, this.manufacturingDate, this.expiry);
        if (start !== '' && end !== '') {
            this.validStartEnd(this.manufacturingDate, this.expiry);
        }
    }

    onDateChanged2(event: IMyDateModel): void {
        this.soldDate = event.formatted;
        this.formSeller.patchValue({ soldDate: event.formatted })

        let start = this.formSeller.get('manufacturingDate').value;
        let end = this.formSeller.get('expiry').value;
        let btw = this.formSeller.get('soldDate').value;

        console.log(207, this.formSeller.get('soldDate').value);
        console.log(208, start, end, btw)

        if (start !== '' && end !== '' && btw !== '') {
            this.validSoldDate(this.manufacturingDate, this.expiry, this.soldDate);
        }
    }

    /** show data when modal is shown */
    show(requests: any): void {
        this.userRequest = requests;
        console.log(88, this.userRequest.username)

        this.manufacturingDate = '';
        this.expiry = '';
        this.soldDate = '';

        this.active = true;
        this.modal.show();
    }

    shown() {
        $('#productCode').focus();
    }

    getValueForSave() {
        this.formSeller.get('productCode').setValue(this.productCode);
        this.formSeller.get('manufacturingDate').setValue(this.manufacturingDate);
        this.formSeller.get('expiry').setValue(this.expiry);
        this.formSeller.get('soldDate').setValue(this.soldDate);
        this.formSeller.get('series').setValue(this.series);
        this.formSeller.get('manufacturer').setValue(this.manufacturer);
    }

    /**
     * save data for ProductInfor
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
            this.sellerService.createTransaction(
                this.userRequest.requestId,
                this.userRequest.productName,
                this.userRequest.quantity,
                this.productCode,
                this.manufacturingDate,
                this.expiry,
                this.soldDate,
                this.series,
                this.manufacturer,
                this.userRequest.seller,
                this.userRequest.userAddress,
                this.userRequest.total)
                .subscribe(balance => {
                    this.walletBalance = balance;
                    Swal.fire({
                        type: 'success',
                        title: String(this.walletBalance.message)
                      })
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