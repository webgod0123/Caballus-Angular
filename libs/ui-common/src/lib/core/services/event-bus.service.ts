import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemEvent } from '../models';
import { SystemEventType } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private _ebus$: Subject<SystemEvent> = new Subject<SystemEvent>();

    public eventStream$: Observable<SystemEvent> = this._ebus$.asObservable();

    constructor() {}

    public send(event: SystemEvent): void {
        this._ebus$.next(event);
    }

    public on<T = any>(eventType: SystemEventType): Observable<T> {
        return this.eventStream$.pipe(
            filter(e => e.type === eventType),
            map(e => e.data)
        );
    }
}
