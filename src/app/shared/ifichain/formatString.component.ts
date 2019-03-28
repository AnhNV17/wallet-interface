export class FormatStringComponent {


    public static vietHoa(e) {
        return e.target.value.toUpperCase();
    }

    public static vietHoaChuDau(e) {
        let strs = e.target.value.split(" ");
        let res = []
        strs.forEach(element => {
            res.push(this.capitalizeFirstLetter(element))
        });
        e.target.value = res.join(" ");
        return e.target.value;
    }

    public static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    public static setAttribute(selector, att, value) {
        $(document).ready(function () {
            var b = document.querySelector(selector);
            b.setAttribute(att, value);
        });
    }

}