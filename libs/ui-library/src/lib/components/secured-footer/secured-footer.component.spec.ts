import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredFooterComponent } from './secured-footer.component';

describe('SecuredFooterComponent', () => {
    let component: SecuredFooterComponent;
    let fixture: ComponentFixture<SecuredFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecuredFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecuredFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
