import { OnInit, Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: 'sellerModal',
    templateUrl: './seller.component.html',
    styleUrls: ['./seller.component.css'],
    animations: [appModuleAnimation()]
})

export class SellerComponent implements OnInit {
    @ViewChild('sellerComponentModal') modal: ModalDirective;

    formSeller: FormGroup;
    active = false;
    saving = false;

    userChoices: any[] = [
        { id: 0, displayName: "Tea" },
        { id: 1, displayName: "Coffee" },
        { id: 2, displayName: "Yogurt" },
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

    /** show data when modal is shown */
    show(): void {
        this.active = true;
        this.modal.show();
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