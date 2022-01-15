import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'caballus-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
