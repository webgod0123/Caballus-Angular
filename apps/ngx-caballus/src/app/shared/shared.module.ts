import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { RouterModule } from '@angular/router';
import { UiLibraryModule } from '@caballus/ui-library';
import { UiCommonModule } from '@caballus/ui-common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
    declarations: [...containers, BackButtonComponent],
    imports: [CommonModule, UiLibraryModule, UiCommonModule, RouterModule, MatSidenavModule],
    exports: [...containers, BackButtonComponent]
})
export class SharedModule {}
