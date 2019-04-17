import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';

@Injectable()
export class AppNavigationService {

    constructor() {

    }

    getMenu(): AppMenu {
        return new AppMenu('MainMenu', 'MainMenu', [
            new AppMenuItem('AdminHome', 'flaticon-line-graph', '/app/main/admin-home'),
            new AppMenuItem('UserHome', 'flaticon-line-graph', '/app/main/home'),

            new AppMenuItem('Seller', 'flaticon-interface-8', '', [
                new AppMenuItem('SellerHome', 'flaticon-suitcase', '/app/admin/seller/requestList')
            ]),

            new AppMenuItem('Supplier', 'flaticon-interface-8', '', [
                new AppMenuItem('SupplierHome', 'flaticon-suitcase', '/app/admin/seller/supplier_home'),
                new AppMenuItem('RequestHandler', 'flaticon-suitcase', '/app/admin/seller/request_handler')
            ])

        ]);
    }

    checkChildMenuItemPermission(menuItem): boolean {

        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.items && subMenuItem.items.length) {
                return this.checkChildMenuItemPermission(subMenuItem);
            } 
            // else if (!subMenuItem.permissionName) {
            //     return true;
            // }
        }

        return false;
    }
}
