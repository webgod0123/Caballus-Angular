import { TestBed } from '@angular/core/testing';

import { SiteTitleService } from './site-title.service';

describe('SiteTitleService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SiteTitleService = TestBed.get(SiteTitleService);
        expect(service).toBeTruthy();
    });
});
