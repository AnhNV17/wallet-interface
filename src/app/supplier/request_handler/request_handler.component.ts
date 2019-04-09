import { OnInit, Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { appModuleAnimation } from "shared/animations/routerTransition";
import { Router, ActivatedRoute } from "@angular/router";
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserWallet } from 'src/app/models/user-wallet';
import { SupplierInputComponent } from '../supplier-input/supplier-input.component';
import { Paginator, LazyLoadEvent } from 'primeng/primeng';
import { PrimengTableHelper } from 'src/shared/helpers/tableHelper';
import { Table } from 'primeng/table';
import { SellerService } from 'src/app/services/seller.service';
import { SupplierService } from 'src/app/services/supplier.service';

export class SelectItem {
    id: number;
    displayName: String;
}

@Component({
    selector: "requestHandler",
    templateUrl: "./request_handler.component.html",
    styleUrls: ["./request_handler.component.css"],
    animations: [appModuleAnimation()]
})
export class RequestHandlerComponent implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    formHandler: FormGroup;
    active = false;
    saving = false;
    userWallet: UserWallet;
    // visible = true;
    isDisplay = true;
    isShow = true;
    sellerRequest: any;
    primengTableHelper: PrimengTableHelper;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userInfo: UserInfoService,
        private supplierSerivce: SupplierService
    ) {
        // this.route.queryParamMap.subscribe(resp => {
        //     this.inforId = +resp.get('id');
        //     this.inforCode = resp.get('code');
        // })

        this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
        this.primengTableHelper = new PrimengTableHelper();
        console.log(41, this.userWallet)
    }

    ngOnInit(): void {
        /** Declare formgroup, formcontrol */
        this.formHandler = new FormGroup(
            {
                productName: new FormControl("", { validators: [Validators.required] }),
                productCode: new FormControl("", { validators: [Validators.required] }),
                quantity: new FormControl("", { validators: [Validators.required] }),
                series: new FormControl("", { validators: [Validators.required] })
            },
            { updateOn: "change" }
        );
    }

    close(): void {
        this.router.navigate(['app', 'supplier', 'supplier-home']);
    }

}
