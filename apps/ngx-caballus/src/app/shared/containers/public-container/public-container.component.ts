import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'caballus-public-container',
    templateUrl: './public-container.component.html',
    styleUrls: ['./public-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicContainerComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
