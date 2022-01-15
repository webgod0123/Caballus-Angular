import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
    TermsModalComponent,
    WelcomeModalComponent,
    ConfirmModalComponent,
    IdleLogoutModalComponent
} from '../modals';
import { Observable } from 'rxjs';
import { SelectOption } from '@rfx/common';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        private readonly _dialog: MatDialog
    ) {}

    public closeAll(): void {
        this._dialog.closeAll();
    }

    public termsAndConditions(
        termsAccepted: boolean,
        pdfSource: string
    ): MatDialogRef<TermsModalComponent> {
        const dialogRef: MatDialogRef<TermsModalComponent> = this._dialog.open(
            TermsModalComponent,
            {
                autoFocus: false,
                maxHeight: '90vh',
                data: {
                    accepted: termsAccepted,
                    pdf: pdfSource
                }
            }
        );
        return dialogRef;
    }

    public welcome(): MatDialogRef<WelcomeModalComponent> {
        const dialogRef: MatDialogRef<WelcomeModalComponent> = this._dialog.open(
            WelcomeModalComponent,
            {
                autoFocus: false,
                maxHeight: '90vh'
            }
        );
        return dialogRef;
    }

    public confirm(
        title: string,
        bodyHtml: string,
        confirm: string
    ): MatDialogRef<ConfirmModalComponent> {
        const dialogRef: MatDialogRef<ConfirmModalComponent> = this._dialog.open(
            ConfirmModalComponent,
            {
                autoFocus: true,
                maxHeight: '90vh',
                data: {
                    title,
                    bodyHtml,
                    confirm
                }
            }
        );
        return dialogRef;
    }

    // public idleLogout(
    //     secRemaining$: Observable<number>,
    //     userTookAction$: Observable<void>
    // ): MatDialogRef<IdleLogoutModalComponent> {
    //     const dialogRef: MatDialogRef<IdleLogoutModalComponent> = this._dialog.open(
    //         IdleLogoutModalComponent,
    //         {
    //             autoFocus: true,
    //             maxHeight: '90vh',
    //             disableClose: true,
    //             data: {
    //                 secRemaining$,
    //                 userTookAction$
    //             }
    //         }
    //     );
    //     return dialogRef;
    // }
}
