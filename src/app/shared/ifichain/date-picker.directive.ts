import { Directive, ElementRef, AfterViewInit, Input, EventEmitter, OnInit, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DateTimeComponent } from './datetime.component';
import { Moment } from 'moment';
// import * as $ from 'jquery';

@Directive({
    selector: '[datetimepicker]'
})
export class DateTimePickerDirective implements AfterViewInit {
    @Input('datetimepicker') datetimepicker :string;
    hostElement: ElementRef;
    constructor(private _element: ElementRef, private control: NgControl) {
        this.hostElement = _element;
    }

    ngAfterViewInit(): void {
        const $element = $(this.hostElement.nativeElement);
        $element.datetimepicker({
            format: this.datetimepicker
        }).on('dp.change', e => {
            if (e.date) {
                let x = DateTimeComponent.getDateNull(this.hostElement) == null ? "" : DateTimeComponent.getDateView(this.hostElement, this.datetimepicker);
                $element.val(x);
                this.control.control.setValue(x);
            }
        });
    }
}