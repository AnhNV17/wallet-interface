import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./main/login/login.component";
import { HomeComponent } from "./main/home/home.component";
import { AdminHomeComponent } from "./main/admin-home/admin-home.component";
import { LogoutComponent } from "./main/logout/logout.component";
import { ChargeModalComponent } from './main/charge/charge.component';
import { ModalModule, ComponentLoaderFactory } from 'ngx-bootstrap';
import { viewUserDetailModalComponent } from './main/userDetail/user-detail.component';

import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SideBarMenuComponent } from './shared/layout/nav/side-bar-menu.component';
import { TopBarMenuComponent } from './shared/layout/nav/top-bar-menu.component';
import { AppCommonModule } from './shared/common/app-common.module';
import { ValidationComponent } from './shared/ifichain/validation-messages.component';
// import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { SupplierHomeComponent } from './main/supplier/supplier-home/supplier-home.component';
import { SupplierInputComponent } from './main/supplier/supplier-input/supplier-input.component';
import { SellerInputComponent } from './main/seller/seller-input/seller-input.component';
import { SellerHomeComponent } from './main/seller/seller_home/seller-home.component';
import { SellerImportModalComponent } from './main/seller/seller_import/seller-import.component';
import { SellerTransferModalComponent } from './main/seller/seller_transfer/seller-transfer.component';
import { RequestHandlerComponent } from './main/supplier/request_handler/request_handler.component';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarMenuComponent,
    TopBarMenuComponent,
    HeaderComponent,
    FooterComponent,
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
    NgxMyDatePickerModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
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
    AppCommonModule.forRoot()
  ],
  providers: [
    ComponentLoaderFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
