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

    public static xuLyDate(today, ngayLike): string {
        let nam = today.getFullYear() - ngayLike.getFullYear();
        let thang = today.getMonth() - ngayLike.getMonth();
        let ngay = today.getDate() - ngayLike.getDate();
        let gio = today.getHours() - ngayLike.getHours();
        let phut = today.getMinutes() - ngayLike.getMinutes();

        if (nam > 0)
            return nam + " năm trước";

        else if (thang > 0)
            return thang + " tháng trước";

        else if (ngay > 0)
            return ngay + " ngày trước";

        else if (gio > 0)
            return gio + " giờ trước";

        else if (phut > 0)
            return phut + " phút trước";

        else if (phut == 0)
            return "1 phút trước";
    }


    // định dạng datetime đầy đủ
    public static formatFullDate(id: ElementRef, date = '', format = "DD/MM/YYYY") {
        $(id.nativeElement).datetimepicker('').data('DateTimePicker').format(format).date(date).viewMode("days");

    }

    // định dạng datetime chỉ năm
    public static formatOnlyYear(id: ElementRef, date = '') {
        $(id.nativeElement).datetimepicker().data('DateTimePicker').format("YYYY").date(date).viewMode("years");

    }

    // định dạng datetime chỉ tháng - năm
    public static formatOnlyMonthYear(id: ElementRef, date = '') {
        $(id.nativeElement).datetimepicker().data('DateTimePicker').format("MM/YYYY").date(date).viewMode("months");
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

    // truyền vào 1 đối tượng xong kiểm tra kiểu để trả về dữ liệu phù hợp
    public static getDateLoad(ob: any, type: string) {
        if (ob != null) {
            switch (type) {
                case 'y':
                    {
                        return ob.birthYear
                    }
                case 'My':
                    {
                        return this.chuanHoa(ob.birthMonth) + '/' + ob.birthYear;

                    }
                case 'dMy':
                    {
                        return ob.birthDate.format('DD/MM/YYYY')
                    }
            }
        }
        else
            return '';

    }

    // truyền vào date nếu nhỏ hơn 10 thì thêm số 0 vào
    public static chuanHoa(date: any) {
        if (date < 10)
            return '0' + date;
        else
            return date;
    }

    showCalendar(id) {
        $(document).ready(function () {
            this.isShowCalendar = !this.isShowCalendar;
            $('#' + id).datetimepicker(this.isShowCalendar ? 'show' : 'hide');
        });
    }

    public static XXX(form: FormGroup, viewChildStar: ElementRef, viewChildEnd: ElementRef, controlStart: string, controlEnd: string, err: object) {
        $(viewChildStar.nativeElement).on('dp.hide', function (e) {
            let dateStart;
            let dateEnd;
            try {
                dateStart = DateTimeComponent.getDateCompare(viewChildStar);
                dateEnd = DateTimeComponent.getDateCompare(viewChildEnd);
            } catch (error) {
            }
            if (DateTimeComponent.compareDate(dateStart, dateEnd)) {
                let x = "" + "";
                form.get(controlStart).setErrors(err);
                form.get(controlEnd).setErrors(null);

            } else {
                form.get(controlStart).setErrors(null);
            }
        });
    }

}

