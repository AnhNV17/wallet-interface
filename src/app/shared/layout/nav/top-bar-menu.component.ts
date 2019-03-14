import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppNavigationService } from './app-navigation.service';

@Component({
    templateUrl: './top-bar-menu.component.html',
    selector: 'top-bar-menu',
    encapsulation: ViewEncapsulation.None
})
export class TopBarMenuComponent implements OnInit {

    menu: AppMenu = null;

    constructor(
        injector: Injector,
        private _appNavigationService: AppNavigationService) {
    }

    ngOnInit() {
        this.menu = this._appNavigationService.getMenu();
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement') {
            return false;
        }

        return true;
    }
}
