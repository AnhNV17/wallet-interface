import { Routes, RouterModule } from '@angular/router';
// import { ModuleWithProviders, NgModule } from '@angular/core/src/metadata/ng_module'; 

import { LoginComponent } from './main/login/login.component';
import { HomeComponent } from './main/home/home.component';
import { AdminHomeComponent } from './main/admin-home/admin-home.component';
import { LogoutComponent } from './main/logout/logout.component';
import { NgModule } from '@angular/core';
import { RequesListComponent } from './main/request/requestList/requestList.component';
import { RequestHandlerComponent } from './main/request/request_handler/request_handler.component';
import { AppComponent } from './app.component';
import { BlockchainComponent } from './main/blockchain/blockchain.component';

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
            { path: 'requestList', component: RequesListComponent, data: {} },
            { path: 'user_detail/:walletId', component: AdminHomeComponent, data: {} },
            { path: 'logout', component: LogoutComponent, data: {} },
            { path: 'request_handler', component: RequestHandlerComponent, data: {} },
            { path: 'admin/blockchain', component: BlockchainComponent, data: {} }
            //     ]
            // }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }