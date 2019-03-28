
import { FormGroup } from "@angular/forms";

export class ShareFuncComponent {

    // Hàm viets hoa hết
    public static vietHoa(e) {
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        let temp = e.target.value.toUpperCase();
        e.target.value = temp;
        e.target.selectionStart = start;
        e.target.selectionEnd = end;
        return e.target.value;
    }

    // Hàm viết hoa chữ đầu
    public static vietHoaChuDau(e) {
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        let strs = e.target.value.split(" ");
        let res = []
        strs.forEach(element => {
            res.push(this.capitalizeFirstLetter(element))
        });
        let temp  = res.join(" ");
        e.target.value = temp;
        e.target.selectionStart = start;
        e.target.selectionEnd = end;
        return e.target.value;
    }

    public static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // truyền vào selector , thuộc tính , giá trị để set cho control đó
    public static setAttribute(selector, att, value) {
        $(document).ready(function () {
            var b = document.querySelector(selector);
            b.setAttribute(att, value);
        });
    }

    // Truyền vào id để focus
    public static autoFocus(id: string) {
        $('#' + id).focus();
    }

    public static controlChange(form: FormGroup, control1: string, control2: string) {
        form.get(control1).valueChanges.subscribe(val => {
            form.get(control1).markAsUntouched({ onlySelf: true });
            if (form.get(control2).value != "")
                form.get(control2).markAsTouched({ onlySelf: true });

        });
        form.get(control2).valueChanges.subscribe(val => {
            form.get(control2).markAsUntouched({ onlySelf: true })
            if (form.get(control1).value != "")
                form.get(control1).markAsTouched({ onlySelf: true });
        });
    }

    // truyền vào 1 formGroup để reset hết các control có lỗi 
    public static formReset(form: FormGroup) {
        try {
            for (var control in form.controls) {
                if (form.get(control).errors) {
                    form.get(control).reset();
                }
            }
        } catch (error) {

        }
    }

}
