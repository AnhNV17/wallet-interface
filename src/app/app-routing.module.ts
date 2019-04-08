import { Routes, RouterModule } from '@angular/router';
// import { ModuleWithProviders, NgModule } from '@angular/core/src/metadata/ng_module'; 

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LogoutComponent } from './logout/logout.component';
import { NgModule } from '@angular/core';
import { SupplierHomeComponent } from './supplier/supplier-home/supplier-home.component';
import { SellerHomeComponent } from './seller/seller_home/seller-home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
                // path: '',
                // children: [
                    { path: '', component: LoginComponent, data: {}  },
                    { path: 'home', component: HomeComponent, data: {}  },
                    { path: 'admin_home', component: AdminHomeComponent, data: {}  },
                    { path: 'seller_home', component: SellerHomeComponent, data: {}  },
                    { path: 'supplier_home', component: SupplierHomeComponent, data: {} },
                    { path: 'user_detail/:walletId', component: AdminHomeComponent, data: {}  },
                    { path: 'logout', component: LogoutComponent, data: {} }
                // ]
            // }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }