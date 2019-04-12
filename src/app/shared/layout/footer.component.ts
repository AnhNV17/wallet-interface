import { Component, Injector, OnInit } from '@angular/core';

@Component({
    templateUrl: './footer.component.html',
    selector: 'footer-bar'
})
export class FooterComponent implements OnInit {

    releaseDate: string;

    constructor(
        injector: Injector
    ) {
        // super(injector);
    }

    ngOnInit(): void {
        // this.releaseDate = this.appSession.application.releaseDate.format('YYYYMMDD');
    }
}
