import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'caballus-terms-modal',
    templateUrl: './terms-modal.component.html',
    styleUrls: ['./terms-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsModalComponent implements OnInit {
    public pdfSrc: string = '';

    constructor(
        public dialogRef: MatDialogRef<TermsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.pdfSrc = this.data.pdf;
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public onTermsAccepted(): void {
        this.dialogRef.close(true);
    }
}
