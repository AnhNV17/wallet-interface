import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
// import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MainRoutingModule } from './main-routing.module';
import { ChargeModalComponent } from './charge/charge.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LogoutComponent } from './logout/logout.component';
import { viewUserDetailModalComponent } from './userDetail/user-detail.component';
import { SellerHomeComponent } from './seller/seller_home/seller-home.component';
import { SellerInputComponent } from './seller/seller-input/seller-input.component';
import { SideBarMenuComponent } from '../shared/layout/nav/side-bar-menu.component';
import { TopBarMenuComponent } from '../shared/layout/nav/top-bar-menu.component';
import { ValidationComponent } from '../shared/ifichain/validation-messages.component';
import { SupplierHomeComponent } from './supplier/supplier-home/supplier-home.component';
import { SupplierInputComponent } from './supplier/supplier-input/supplier-input.component';
import { SellerImportModalComponent } from './seller/seller_import/seller-import.component';
import { SellerTransferModalComponent } from './seller/seller_transfer/seller-transfer.component';
import { RequestHandlerComponent } from './supplier/request_handler/request_handler.component';
import { HeaderComponent } from '../shared/layout/header.component';
import { FooterComponent } from '../shared/layout/footer.component';
import { ModalModule, ComponentLoaderFactory } from 'ngx-bootstrap';
import { AppCommonModule } from '../shared/common/app-common.module';

@NgModule({
  exports: [ChargeModalComponent],
  declarations: [
    LoginComponent,
    HomeComponent,
    AdminHomeComponent,
    LogoutComponent,
    ChargeModalComponent,
    viewUserDetailModalComponent,
    SellerHomeComponent,
    SellerInputComponent,
    ValidationComponent,
    SupplierHomeComponent,
    SupplierInputComponent,
    SellerImportModalComponent,
    SellerTransferModalComponent,
    RequestHandlerComponent
  ],
  imports: [
    // NKDatetimeModule,
    // NgxMyDatePickerModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    PaginatorModule,
    AutoCompleteModule,
    EditorModule,
    TableModule,
    CommonModule,
    AppCommonModule,
    MainRoutingModule
  ]
//   providers: [
//     ComponentLoaderFactory
//   ],
//   bootstrap: [AppComponent]
})
export class MainModule { }
