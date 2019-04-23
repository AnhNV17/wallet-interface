import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
// import { AppLocalizationService } from '../common/localization/app-localization.service';
import * as moment from 'moment';

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
            'required': 'This is required field.',
            'isStartMax': 'Thoi gian nho hon ngay ket thuc',
            'isEndMin': 'Thoi gian lon hon ngay bat dau',
            'pattern': 'Chi nhap ky tu thuong',
            'isErrToday': 'Lon hon ngay hien tai'
        }
        return messages[err]
    }

    // kiểm tra dấu cách - nếu có dấu cách là lỗi
    public static CheckSpace(control: AbstractControl) {
        try {
            // nếu k phai số trả về true
            // debugger
            if (control.value != null) {
                if (control.value.trim().length == 0) {
                    return { required: true };
                }
            }
            return null;
        } catch (error) {

        }
    }

    // chỉ cho chữ thường a - z A-Z
    public static checkCharacters(control: AbstractControl) {
        // nếu k phai chữ thường trả về true
        // debugger
        if (control.value != null) {
            if (/[^A-Z0-9]+/.test(control.value)) {
                return { pattern: true };
            }
        }
        return null;
    }

    // nếu thời gian lớn hơn ngày hiện tại thì bắt lỗi
    public static compareDate(start: string, end: string, errStart = { isStartMax: true }, errEnd = { isEndMin: true }, format = "DD/MM/YYYY") {
        try {
            return (c: AbstractControl) => {
                if (c.get(start).value != "" && c.get(end).value != "") {
                    var Start = moment(c.get(start).value, format); // ngày bắt đầu
                    var End = moment(c.get(end).value, format);    // ngày kết thúc
                    if (Start > End) {    // nết bắt đầu lớn hơn kêt thúc thì bắt lỗi bắt đầu , xóa lỗi kết thúc
                        if (!c.get(start).touched) {   // nếu thay đổi bên Start
                            c.get(start).setErrors(errStart);
                            c.get(end).setErrors(null);
                            c.get(start).markAsTouched({ onlySelf: true });
                        }
                        else if (!c.get(end).touched) { // nếu thay đổi bên End
                            c.get(end).setErrors(errEnd);
                            c.get(end).markAsTouched({ onlySelf: true });
                            c.get(start).setErrors(null);
                        }
                        return null;
                    }
                    else {
                        c.get(end).setErrors(null);
                        c.get(start).setErrors(null);

                    }
                }
            }
        } catch (error) {

        }
    }

}
