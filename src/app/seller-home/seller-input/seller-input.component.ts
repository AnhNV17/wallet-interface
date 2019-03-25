import { OnInit, Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DateTimeComponent } from 'src/app/shared/ifichain/datetime.component';
import * as $ from 'jquery';

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
    @ViewChild('ProductName') ProductName: NgSelectComponent;
    @ViewChild('sampleDatePickerManDate') sampleDatePickerManDate: ElementRef;
    @ViewChild('SampleDatePickerExpiry') SampleDatePickerExpiry: ElementRef;

    formSeller: FormGroup;
    active = false;
    saving = false;
    showError = false;
    isShowCalendar = 'hide';

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
    ) {
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

        // $('#manufacturingDate').datetimepicker({

        //     format: 'DD/MM/YYYY'
        // });

        // $('.datepicker').datepicker({
        //     startDate: '-3d'
        // });
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
    show(): void {
        this.formSeller.get('productName').reset();
        this.active = true;
        this.modal.show();
    }

    shown() {
        this.ProductName.focus();
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
            if (check == 'productName')
                this.ProductName.focus();
        } else {
            // this.notify.info('UpdateSuccessfully');
            alert('successfully');
            this.showError = false;
            // this.saving = true;
            this.close();
        }
    }

    /** close modal and reset form */
    close(): void {
        this.active = false;
        this.modal.hide();
        this.formSeller.reset();
    }

}