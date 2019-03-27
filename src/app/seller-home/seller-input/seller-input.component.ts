import { OnInit, Component, Injector, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { DateTimeComponent } from 'src/app/shared/ifichain/datetime.component';
import * as $ from 'jquery';
import { ProductInfor } from 'src/app/models/productInfor';
import { SellerService } from 'src/app/services/seller.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import * as moment from 'moment';

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
    manufacturingDate: string = '';
    expiry: string = '';
    soldDate: string = '';
    series: String;
    manufacturer: String;

    myOptions: INgxMyDpOptions = {
        // todayBtnTxt: 'Today',
        dateFormat: 'dd/mm/yyyy',
        // firstDayOfWeek: 'mo',
        // sunHighlight: true,
        // disableUntil: { year: 2016, month: 8, day: 10 }
    };

    // datetimepicker: DateTimePicker = new DateTimePicker({});

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
            expiry: new FormControl('', {}),
            manufacturingDate: new FormControl('', {}),
            soldDate: new FormControl('', {}),
            series: new FormControl('', {}),
            manufacturer: new FormControl('', {}),

        }, { updateOn: 'change' });
    }

    setDate(): void {
        // Set today date using the patchValue function
        let date = new Date();
        this.formSeller.patchValue({
            manufacturingDate: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
        });
    }

    clearDate(): void {
        // Clear the date using the patchValue function
        this.formSeller.patchValue({ manufacturingDate: null, expiry: null, soldeDate: null });
    }


    onDateChanged(event: IMyDateModel): void {
        // event.formatted;
        this.manufacturingDate = event.formatted;
        this.expiry = event.formatted;
        this.soldDate = event.formatted
        // date selected
    }

    /** show data when modal is shown */
    show(requests: any): void {
        this.userRequest = requests;
        console.log(88, this.userRequest.username)

        // DateTimeComponent.formatFullDate(this.dpManDate.dateFormat);
        this.manufacturingDate = null;
        this.expiry = null;
        this.soldDate = null;

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
        // try {
        //     this.manufacturingDate = DateTimeComponent.getDateNull(this.dpManDate) == null ? null : DateTimeComponent.getDateInsert(this.dpManDate);
        //     this.expiry = DateTimeComponent.getDateNull(this.dpExpiry) == null ? null : DateTimeComponent.getDateInsert(this.dpExpiry);
        //     this.soldDate = DateTimeComponent.getDateNull(this.dpSoldDate) == null ? null : DateTimeComponent.getDateInsert(this.dpSoldDate);
        // } catch (error) {

        // }

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
            console.log(168, this.manufacturingDate)
            this.sellerService.createTransaction(
                this.userRequest.requestId,
                this.userRequest.productName,
                this.userRequest.quantity,
                this.productCode,
                this.series,
                this.manufacturer,
                this.userRequest.seller,
                this.userRequest.userAddress,
                this.userRequest.total)
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