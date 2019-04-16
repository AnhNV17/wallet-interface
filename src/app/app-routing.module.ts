import { Routes, RouterModule } from '@angular/router';
// import { ModuleWithProviders, NgModule } from '@angular/core/src/metadata/ng_module'; 

import { LoginComponent } from './main/login/login.component';
import { HomeComponent } from './main/home/home.component';
import { AdminHomeComponent } from './main/admin-home/admin-home.component';
import { LogoutComponent } from './main/logout/logout.component';
import { NgModule } from '@angular/core';
import { SupplierHomeComponent } from './main/supplier/supplier-home/supplier-home.component';
import { SellerHomeComponent } from './main/seller/seller_home/seller-home.component';
import { RequestHandlerComponent } from './main/supplier/request_handler/request_handler.component';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
            //     path: '',
            //     component: LoginComponent
            //     children: [
            { path: '', component: LoginComponent, data: {} },
            { path: 'home', component: HomeComponent, data: {} },
            { path: 'admin_home', component: AdminHomeComponent, data: {} },
            { path: 'seller_home', component: SellerHomeComponent, data: {} },
            { path: 'supplier_home', component: SupplierHomeComponent, data: {} },
            { path: 'user_detail/:walletId', component: AdminHomeComponent, data: {} },
            { path: 'logout', component: LogoutComponent, data: {} },
            { path: 'supplier_handler', component: RequestHandlerComponent, data: {} }
            //     ]
            // }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }