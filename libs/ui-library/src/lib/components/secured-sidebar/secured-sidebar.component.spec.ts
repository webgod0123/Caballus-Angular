import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredSidebarComponent } from './secured-sidebar.component';

describe('SecuredSidebarComponent', () => {
    let component: SecuredSidebarComponent;
    let fixture: ComponentFixture<SecuredSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecuredSidebarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecuredSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
