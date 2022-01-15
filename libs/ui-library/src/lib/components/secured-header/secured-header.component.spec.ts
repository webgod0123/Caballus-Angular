import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredHeaderComponent } from './secured-header.component';

describe('SecuredHeaderComponent', () => {
    let component: SecuredHeaderComponent;
    let fixture: ComponentFixture<SecuredHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecuredHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecuredHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
