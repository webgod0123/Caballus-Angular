import { Component, OnInit, Input } from '@angular/core';
import { SiteTitleService } from '@caballus/ui-common';

@Component({
    selector: 'caballus-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
    private _title: string = '';
    @Input()
    public set title(value: string) {
        this._title = value;
        this._titleService.setTitle(`${value} | Starter Project`);
    }
    public get title(): string {
        return this._title;
    }

    constructor(private _titleService: SiteTitleService) {}

    ngOnInit(): void {}
}
