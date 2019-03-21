import { OnInit, Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { NgSelectComponent } from '@ng-select/ng-select';
// import * as $ from "jquery";

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
    @ViewChild('SampleDatePicker') sampleDatePicker: ElementRef;

    formSeller: FormGroup;
    active = false;
    saving = false;

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
    }

    // ngAfterViewInit(): void {

    //     // default date picker
    //     $(this.sampleDatePicker.nativeElement).datetimepicker({
    //         format: 'L'
    //     });
    // }

    /** show data when modal is shown */
    show(): void {
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
        this.saving = true;
    }

    /** close modal and reset form */
    close(): void {
        this.active = false;
        this.modal.hide();
    }

}