import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    Output,
    EventEmitter
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ReplaySubject, Observable } from 'rxjs';
import { startWith, pluck, distinctUntilChanged, scan, shareReplay, tap } from 'rxjs/operators';
import { MenuItem } from '@caballus/ui-common';

interface SidebarState {
    arrowType: 'arrow-alt-from-left' | 'arrow-alt-to-left';
    opened: boolean;
    menuItems: MenuItem[];
    expandedItem: MenuItem;
    pinned: boolean;
    tooltipDelay: string;
}

@Component({
    selector: 'caballus-secured-sidebar',
    templateUrl: './secured-sidebar.component.html',
    styleUrls: ['./secured-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuredSidebarComponent implements OnInit {
    @HostBinding('class.open')
    private get _opened(): boolean {
        let val: boolean;
        this.opened$.subscribe(opened => (val = opened));
        return val;
    }
    @Input()
    public set opened(value: boolean) {
        this._state.next({ opened: coerceBooleanProperty(value) });
    }
    @Input()
    public set menuItems(value: MenuItem[]) {
        if (!Array.isArray(value)) {
            value = [];
        }
        this._state.next({ menuItems: value });
    }

    @Output()
    public toggle: EventEmitter<boolean | void> = new EventEmitter<boolean | void>();

    private _initialState: SidebarState = {
        arrowType: 'arrow-alt-from-left',
        opened: false,
        menuItems: [],
        expandedItem: null,
        pinned: false,
        tooltipDelay: '500'
    };
    // prettier-ignore
    private _state: ReplaySubject<Partial<SidebarState>>
        = new ReplaySubject<Partial<SidebarState>>();

    public state$: Observable<SidebarState> = this._state.asObservable().pipe(
        startWith(this._initialState),
        scan(
            (sidebarState: SidebarState, command): SidebarState => ({ ...sidebarState, ...command })
        ),
        shareReplay(1)
    );
    public opened$: Observable<boolean> = this.state$.pipe(
        pluck<SidebarState, boolean>('opened'),
        distinctUntilChanged(),
        tap(opened =>
            this._state.next({ arrowType: opened ? 'arrow-alt-to-left' : 'arrow-alt-from-left' })
        )
    );
    public arrowIcon$: Observable<string> = this.state$.pipe(
        pluck<SidebarState, string>('arrowType'),
        distinctUntilChanged()
    );
    public menuItems$: Observable<MenuItem[]> = this.state$.pipe(
        pluck<SidebarState, MenuItem[]>('menuItems'),
        distinctUntilChanged()
    );
    public expandedItem$: Observable<MenuItem> = this.state$.pipe(
        pluck<SidebarState, MenuItem>('expandedItem'),
        distinctUntilChanged()
    );
    public pinned$: Observable<boolean> = this.state$.pipe(
        pluck<SidebarState, boolean>('pinned'),
        distinctUntilChanged()
    );

    constructor() {}

    ngOnInit(): void {}

    public toggleOpen(shouldOpen?: boolean): void {
        this.toggle.emit(shouldOpen);
        if (!shouldOpen) {
            this._state.next({ expandedItem: null });
        }
    }

    public expandItem(opened: boolean, expandedItem: MenuItem, item: MenuItem): void {
        if (!opened) {
            this.toggle.emit(true);
        }
        this._state.next({ expandedItem: !opened || item !== expandedItem ? item : null });
    }

    public pin(shouldPin: boolean, event: MouseEvent): void {
        event.stopPropagation();
        this._state.next({ pinned: shouldPin });
    }
}
