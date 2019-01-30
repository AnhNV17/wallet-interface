import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module'; 

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LogoutComponent } from './logout/logout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, 
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'admin_home',
        component: AdminHomeComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);