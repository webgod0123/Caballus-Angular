import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'caballus-welcome-modal',
    templateUrl: './welcome-modal.component.html',
    styleUrls: ['./welcome-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<WelcomeModalComponent>) {}

    ngOnInit(): void {}

    public close(): void {
        this.dialogRef.close();
    }
}
