import { OnInit, Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import * as $ from 'jquery';
import { ProductInfor } from 'src/app/models/productInfor';
import { SellerService } from 'src/app/services/seller.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import * as moment from 'moment';
import { FormatStringComponent } from 'src/app/shared/ifichain/formatString.component';
import Swal from 'sweetalert2';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SupplierService } from 'src/app/services/supplier.service';
import { tick } from '@angular/core/testing';
import { ValidationComponent } from 'src/app/shared/ifichain/validation-messages.component';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: 'supplierInputModal',
    templateUrl: './supplier-input.component.html',
    styleUrls: ['./supplier-input.component.css'],
    animations: [appModuleAnimation()]
})

export class SupplierInputComponent implements OnInit {
    @ViewChild('supplierInputComponentModal') modal: ModalDirective;
    @ViewChild('dpManDate') dpManDate: ElementRef;
    @ViewChild('dpExpiry') dpExpiry: ElementRef;
    @ViewChild('dpSoldDate') dpSoldDate: ElementRef;
    @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
    @ViewChild('ProductOptions') ProductOptions: NgSelectComponent;
    @Output() resetList: EventEmitter<any> = new EventEmitter<any>();

    formSupplierInput: FormGroup;
    active = false;
    saving = false;
    showError = false;
    isShowCalendar = false;
    requestId: String;
    productInfor: ProductInfor;
    userRequest: any;
    walletBalance: UserWallet;

    productName: any;
    productCode: String;
    manufacturingDate: String;
    expiry: String;
    quantityOfConsignment: Number;
    amount: Number;
    // soldDate: String;
    // series: String;
    manufacturer: String;

    format = 'dd/mm/yyyy';

    dpOptions: INgxMyDpOptions = {
        // todayBtnTxt: 'Today',
        dateFormat: 'dd/mm/yyyy',
    };

    packageChoices: any[] = [
        { id: 0, displayName: "Consignment 1" },
        { id: 1, displayName: "Consignment 2" },
        { id: 2, displayName: "Consignment 3" },
        { id: 3, displayName: "Consignment 4" },
        { id: 4, displayName: "Consignment 5" }
    ];

    selectItems: any[] = [
        { id: 0, displayName: "Abrica" },
        { id: 1, displayName: "Robusta" },
        { id: 2, displayName: "Culi" }
    ];

    constructor(
        // injector: Injector,
        private supplierService: SupplierService,
    ) {
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formSupplierInput = new FormGroup({
            productCode: new FormControl('', { validators: [Validators.required, ValidationComponent.checkCharacters] }),
            productName: new FormControl("", { validators: [Validators.required] }),
            manufacturingDate: new FormControl('', {}),
            expiry: new FormControl('', {}),
            quantityOfConsignment: new FormControl('', { validators: [Validators.required] }),
            amount: new FormControl('', { validators: [Validators.required] }),
            manufacturer: new FormControl('', { validators: [Validators.required] })
        }, { updateOn: 'change' });
    }

    uppercaseAll(e: any) {
        this.productCode = FormatStringComponent.vietHoa(e);
    }

    validStartEnd(st: any, en: any) {
        const $el = this;
        // if (st != '' && en != '') {

        // if ($el.formSupplierInput.get('manufacturingDate').touched) {
        //     try {
        //         // console.log(109, st, en)
        //         var Start = moment(st, "DD/MM/YYYY");
        //         var End = moment(en, "DD/MM/YYYY");
        //         // var today = moment(new Date(), "DD/MM/YYYY");

        //     } catch (error) {
        //     }

        //     if (Start > End) {
        //         $el.formSupplierInput.get('manufacturingDate').setErrors({ isStartMax: true })
        //     } else {
        //         $el.formSupplierInput.get('manufacturingDate').setErrors(null)
        //     }

        //     $el.formSupplierInput.get('manufacturingDate').markAsTouched({ onlySelf: false });

        //     if (!$el.formSupplierInput.get('expiry').getError("isErrToday"))
        //         $el.formSupplierInput.get('expiry').setErrors(null)

        // } else if ($el.formSupplierInput.get('expiry').touched) {
        //     try {
        //         var dateStart = moment(st, "DD/MM/YYYY");
        //         var dateEnd = moment(en, "DD/MM/YYYY");
        //         var today = moment(new Date(), "DD/MM/YYYY");

        //         console.log(134, today)

        //     } catch (err) {

        //     }
        //     if (dateEnd < dateStart) {
        //         $el.formSupplierInput.get('expiry').setErrors({ isEndMin: true })
        //     } else if (dateEnd < today) {
        //         $el.formSupplierInput.get('expiry').setErrors({ isErrToday: true })
        //     } else {
        //         $el.formSupplierInput.get('expiry').setErrors(null)
        //     }
        //     // $el.formSupplierInput.get('expiry').setErrors(null)

        //     $el.formSupplierInput.get('expiry').markAsTouched({ onlySelf: false });
        // }

        try {
            var Start = moment(st, "DD/MM/YYYY");
            var End = moment(en, "DD/MM/YYYY");
            var today = moment(new Date(), "DD/MM/YYYY");

            console.log(134, today)

        } catch (err) {

        }

        if (Start > End) {
            if ($el.formSupplierInput.get('manufacturingDate').touched) {
                $el.formSupplierInput.get('manufacturingDate').setErrors({ isStartMax: true });
                // $el.formSupplierInput.get('expiry').setErrors(null);
                $el.formSupplierInput.get('manufacturingDate').markAsTouched({ onlySelf: true });
            } else if ($el.formSupplierInput.get('expiry').touched) {
                $el.formSupplierInput.get('expiry').setErrors({ isEndMin: true });
                $el.formSupplierInput.get('expiry').markAsTouched({ onlySelf: true });
                // $el.formSupplierInput.get('manufacturingDate').setErrors(null);
            }
        } else if (End < today) {
            $el.formSupplierInput.get('expiry').setErrors({ isErrToday: true });
            $el.formSupplierInput.get('expiry').markAsTouched({ onlySelf: true });
        } else {
            $el.formSupplierInput.get('expiry').setErrors(null);
            $el.formSupplierInput.get('manufacturingDate').setErrors(null);
        }
    }

    onDateChangedTest(e: IMyDateModel, e1: IMyDateModel): void {
        if (e !== undefined && e1 !== undefined) {
            this.manufacturingDate = e.formatted;
            this.formSupplierInput.patchValue({ manufacturingDate: e.formatted });

            this.manufacturingDate = e1.formatted;
            this.formSupplierInput.patchValue({ manufacturingDate: e1.formatted });
            console.log(142, this.formSupplierInput.get('manufacturingDate').value, this.formSupplierInput.get('expiry').value);
            this.validStartEnd(this.formSupplierInput.get('manufacturingDate').value, this.formSupplierInput.get('expiry'));
        }
    }


    onDateChanged(event: IMyDateModel): void {
        this.manufacturingDate = event.formatted;
        this.formSupplierInput.patchValue({ manufacturingDate: event.formatted });

        let start = this.formSupplierInput.get('manufacturingDate').value;
        let end = this.formSupplierInput.get('expiry').value;
        // console.log(142, this.formSeller.get('manufacturingDate').value, this.formSeller.get('expiry').value);
        // if (start !== '' && end !== '') {
        this.validStartEnd(this.manufacturingDate, this.expiry);
        // }
    }

    onDateChanged1(event: IMyDateModel): void {
        this.expiry = event.formatted;
        this.formSupplierInput.patchValue({ expiry: event.formatted })

        let start = this.formSupplierInput.get('manufacturingDate').value;
        let end = this.formSupplierInput.get('expiry').value;
        // console.log(172, this.formSeller.get('manufacturingDate').value, this.formSeller.get('expiry').value);
        // console.log(143, this.manufacturingDate, this.expiry);
        // if (start !== '' && end !== '') {
        this.validStartEnd(this.manufacturingDate, this.expiry);
        // }
    }

    /** show data when modal is shown */
    show(requests: any): void {
        this.userRequest = requests;
        console.log(239, this.userRequest)

        // this.manufacturingDate = '';
        // this.expiry = '';
        // this.formSupplierInput.reset();
        // this.soldDate = '';

        this.active = true;
        this.modal.show();
    }

    shown() {
        $('#productCode').focus();
    }

    getValueForSave() {
        this.formSupplierInput.get('productName').setValue(this.productName);
        this.formSupplierInput.get('productCode').setValue(this.productCode);
        this.formSupplierInput.get('manufacturingDate').setValue(this.manufacturingDate);
        this.formSupplierInput.get('expiry').setValue(this.expiry);
        this.formSupplierInput.get('quantityOfConsignment').setValue(this.quantityOfConsignment);
        this.formSupplierInput.get('amount').setValue(this.amount);
        this.formSupplierInput.get('manufacturer').setValue(this.manufacturer);
    }

    /**
     * save data for ProductInfor
     */
    save(): void {
        let check = '';
        for (var control in this.formSupplierInput.controls) {
            if (this.formSupplierInput.get(control).errors) {
                check = control;
                this.showError = true;
                break;
            }
        }
        if (check != '') {
            for (var control in this.formSupplierInput.controls) {
                this.formSupplierInput.get(control).markAsTouched({ onlySelf: true });
            }
            $('#' + check).focus();
            if (check == 'pruductName')
                this.ProductOptions.focus();
        } else {
            this.getValueForSave();
            console.log(284, this.userRequest)
            this.supplierService.createConsignmentDetail(
                this.productName,
                this.productCode,
                this.quantityOfConsignment,
                this.amount,
                this.manufacturingDate,
                this.expiry,
                this.manufacturer,
                this.userRequest.productName
            )
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
                })
            this.showError = false;
            // this.saving = true;
            this.close();
        }
    }

    /** close modal and reset form */
    close(): void {
        this.resetList.emit();
        this.active = false;
        this.modal.hide();
        this.formSupplierInput.reset();
    }

}