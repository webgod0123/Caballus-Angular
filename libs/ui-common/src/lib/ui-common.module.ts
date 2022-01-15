import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { modals } from './core/modals';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RfxGridModule } from '@rfx/ngx-grid';

@NgModule({
    declarations: [...modals],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        PdfViewerModule,
        RfxGridModule,
        ToastrModule.forRoot({
            tapToDismiss: true,
            newestOnTop: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 5000,
            extendedTimeOut: 1000,
            easeTime: 300
        })
    ],
    exports: [RfxGridModule],
    entryComponents: [...modals]
})
export class UiCommonModule {}
