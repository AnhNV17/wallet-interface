import * as ngCommon from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { AppNavigationService } from '../layout/nav/app-navigation.service';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        TableModule,
        PaginatorModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AppNavigationService
    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule,
            providers: [
            ]
        };
    }
}
