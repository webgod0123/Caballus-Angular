import { async, TestBed } from '@angular/core/testing';
import { UiLibraryModule } from './ui-library.module';

describe('UiLibraryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiLibraryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiLibraryModule).toBeDefined();
  });
});
