import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'caballus-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
    @Output()
    public click: EventEmitter<void> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
