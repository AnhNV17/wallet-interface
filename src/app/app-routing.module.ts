import { Routes, RouterModule } from '@angular/router';
// import { ModuleWithProviders, NgModule } from '@angular/core/src/metadata/ng_module'; 

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LogoutComponent } from './logout/logout.component';
import { NgModule } from '@angular/core';
import { SellerHomeComponent } from './seller-home/seller-home.component';

// export const AppRoutes: Routes = [
//     {
//         path: '',
//         component: LoginComponent
//     }, 
//     {
//         path: 'home',
//         component: HomeComponent
//     },
//     {
//         path: 'admin_home',
//         component: AdminHomeComponent
//     },
//     {
//         path: 'logout',
//         component: LogoutComponent
//     },
//     {
//         path: 'user_detail/:walletId',
//         component: AdminHomeComponent
//     }
// ];

// export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);

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