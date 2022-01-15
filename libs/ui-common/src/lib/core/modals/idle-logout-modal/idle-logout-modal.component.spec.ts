import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleLogoutModalComponent } from './idle-logout-modal.component';

describe('IdleLogoutModalComponent', () => {
  let component: IdleLogoutModalComponent;
  let fixture: ComponentFixture<IdleLogoutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdleLogoutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleLogoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
