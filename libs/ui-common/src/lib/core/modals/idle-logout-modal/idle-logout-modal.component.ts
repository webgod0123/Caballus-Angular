import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'caballus-idle-logout-modal',
    templateUrl: './idle-logout-modal.component.html',
    styleUrls: ['./idle-logout-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdleLogoutModalComponent implements OnInit {
    public secRemaining$: BehaviorSubject<number> =
        new BehaviorSubject(0);
    public message$: Observable<string> =
        this.secRemaining$.pipe(
            map(sec =>
                `You will be logged out for inactivity in ${sec} seconds.`
            )
        );

    private _onDestroy$: Subject<void> =
        new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<IdleLogoutModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            secRemaining$: Observable<number>;
            userTookAction$: Observable<void>;
        }
    ) {
        data.secRemaining$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(sec => this.secRemaining$.next(sec));
        data.userTookAction$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this.dialogRef.close());
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this.secRemaining$.complete();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
