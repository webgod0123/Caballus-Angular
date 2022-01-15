import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SiteTitleService {
    constructor(private _title: Title) {}

    public setTitle(newTitle: string): void {
        this._title.setTitle(newTitle);
    }
}
