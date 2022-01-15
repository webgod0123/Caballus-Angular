import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredContainerComponent } from './secured-container.component';

xdescribe('SecuredContainerComponent', () => {
    let component: SecuredContainerComponent;
    let fixture: ComponentFixture<SecuredContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecuredContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecuredContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
