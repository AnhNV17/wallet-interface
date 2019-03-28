import { ElementRef } from "@angular/core";
import * as moment from 'moment';
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import * as $ from 'jquery';

export class DateTimeComponent {

    // dùng để so sánh xem thời gian sau có nhỏ hơn thời gian trước hay không
    public static compareDate(start, end) {
        var Start = moment(start, "DD/MM/YYYY");
        var End = moment(end, "DD/MM/YYYY");
        if (Start && End) {
            if (Start > End) {
                return true;
            }
            else {
                return false;
            }
        }
        else
            return false;

    }

    // định dạng datetime đầy đủ
    public static formatFullDate(id: ElementRef, date = '', format = "DD/MM/YYYY") {
        $(id.nativeElement).datetimepicker('').data('DateTimePicker').format(format).date(date).viewMode("days");

    }

    // chuẩn hóa về dạng chuẩn để thêm,sửa trường BirthDate
    public static getDateInsert(id: ElementRef) {
        return moment($(id.nativeElement).data('DateTimePicker').date().format('YYYY/MM/DD HH:mm:ss'));
        //  return $(id.nativeElement).data('DateTimePicker').date().format('DD/MM/YYYY HH:mm:ss' );
    }

    // chuẩn hóa về dạng chuẩn để so sánh với nhau
    public static getDateCompare(id: ElementRef) {
        return moment($(id.nativeElement).data('DateTimePicker').date().format('YYYY/MM/DD'));
        //  return $(id.nativeElement).data('DateTimePicker').date().format('DD/MM/YYYY HH:mm:ss' );
    }

    // trả về 1 chuỗi ngày tháng có định dạng DD/MM/YYYY
    public static getDateView(id: ElementRef, format = 'DD/MM/YYYY') {
        return $(id.nativeElement).data('DateTimePicker').date().format(format);
    }

    // ktra xem input dateTime có dữ liệu hay không
    public static getDateNull(id: ElementRef) {
        return $(id.nativeElement).data('DateTimePicker').date();
    }

    // dùng để so sánh xem thời gian sau có nhỏ hơn thời gian trước hay không
    public static compareDate1(Start, End) {

        if (Start && End) {
            if (Start > End)
                return true;
            else
                return false;


        }
        else
            return false;
    }

    public static compareDate2(Start, End) {
        var x1 = new Date(Start);
        var x2 = new Date(End);
        if (ktra(x1, x2)) {
            return false;
        }
        else {
            if (Start && End) {

                if (Start < End)
                    return true;
                else
                    return false;
            }
            else
                return false
        }

        function ktra(start, end) {
            if (start.getDate() == end.getDate() && start.getFullYear() == end.getFullYear() && start.getMonth() == end.getMonth()) {
                return true;
            }
            else {
                return false;
            }

        }
    }


}

