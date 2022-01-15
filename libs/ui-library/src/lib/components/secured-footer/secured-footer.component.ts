import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'caballus-secured-footer',
    templateUrl: './secured-footer.component.html',
    styleUrls: ['./secured-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuredFooterComponent implements OnInit {
    public currentYear: string;

    constructor() {}

    ngOnInit(): void {
        const now = new Date();
        this.currentYear = now.getFullYear().toString();
    }
}
