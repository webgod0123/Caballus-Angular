import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserState, SeenWelcomeModalAction } from '@caballus/ui-state';
import { ModalService, UserService } from '@caballus/ui-common';
import { Select, Store } from '@ngxs/store';
import { Observable, of, iif } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';

@Component({
    selector: 'caballus-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
    @Select(UserState.seenWelcomeModal)
    public seenWelcomeModal$: Observable<boolean>;

    constructor(
        private readonly _modalService: ModalService,
        private readonly _userService: UserService,
        private readonly _store: Store
    ) {}

    public ngOnInit(): void {
        this.seenWelcomeModal$.pipe(
            take(1),
            switchMap(seen => seen
                ? of(false)
                : this._modalService
                    .welcome()
                    .afterClosed()
                    .pipe(map(() => true))
            ),
            switchMap(shown =>
                iif(() => shown,
                    this._userService
                        .seenWelcomeModal()
                        .pipe(map(() => true)),
                    of(false)
                )
            ),
            tap(updated => {
                if (updated) {
                    this._store.dispatch(new SeenWelcomeModalAction());
                }
            })
        ).subscribe();
    }

}
