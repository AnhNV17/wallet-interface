import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
// import { AppLocalizationService } from '../common/localization/app-localization.service';


@Component({
    selector: '<validation>',
    template: ` <div *ngIf="control?.touched"> <span  class="mess-error help-block form-control-feedback" >
                     {{message}}
                </span>
                </div>
    `
})
export class ValidationComponent {

    @Input() control;

    ngOnInit() { }
    get message() {
        try {
            if (this.control.errors) {
                for (let err in this.control.errors) {
                    return this.getErrorMessage(err);
                }
            }
        } catch (error) {

        }

    }

    getErrorMessage(err) {
        let messages = {
            'required': 'This is required field.'
        }
        return messages[err]
    }

    // kiểm tra dấu cách - nếu có dấu cách là lỗi
    public static KtraKhoangTrang(control: AbstractControl) {
        try {
            // nếu k phai số trả về true
            if (control.value != null) {
                if (control.value.trim().length == 0) {
                    return { required: true };
                }
            }
            return null;
        } catch (error) {

        }
    }
}
