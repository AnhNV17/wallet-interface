import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppNavigationService } from './app-navigation.service';

@Component({
    templateUrl: './side-bar-menu.component.html',
    selector: 'side-bar-menu',
    encapsulation: ViewEncapsulation.None
})
export class SideBarMenuComponent implements OnInit {

    menu: AppMenu = null;

    constructor(
        injector: Injector,
        private _appNavigationService: AppNavigationService) {
    }

    ngOnInit() {
        this.menu = this._appNavigationService.getMenu();
    }

    showMenuItem(menuItem): boolean {
        // if (menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement') {
        //     return false;
        // }

        // if (menuItem.items && menuItem.items.length) {
        //     return this._appNavigationService.checkChildMenuItemPermission(menuItem);
        // }

        return true;
    }
}
