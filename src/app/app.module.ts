import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { LogoutComponent } from "./logout/logout.component";
import { ChargeModalComponent } from './charge/charge.component';
import { ModalModule, ComponentLoaderFactory } from 'ngx-bootstrap';
import { viewUserDetailModalComponent } from './userDetail/user-detail.component';

import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SideBarMenuComponent } from './shared/layout/nav/side-bar-menu.component';
import { TopBarMenuComponent } from './shared/layout/nav/top-bar-menu.component';
import { AppCommonModule } from './shared/common/app-common.module';
import { ValidationComponent } from './shared/ifichain/validation-messages.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerInputComponent } from './seller-home/seller-input/seller-input.component';
// import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { SupplierHomeComponent } from './supplier/supplier-home/supplier-home.component';
import { SupplierInputComponent } from './supplier/supplier-input/supplier-input.component';

@NgModule({
  exports: [ChargeModalComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminHomeComponent,
    LogoutComponent,
    ChargeModalComponent,
    viewUserDetailModalComponent,
    SellerHomeComponent,
    SellerInputComponent,
    SideBarMenuComponent,
    TopBarMenuComponent,
    ValidationComponent,
    SupplierHomeComponent,
    SupplierInputComponent
  ],
  imports: [
    // NKDatetimeModule,
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
    AppCommonModule
  ],
  providers: [
    ComponentLoaderFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
