import { TestBed } from '@angular/core/testing';

import { ResponsableRayonService } from './responsable-rayon.service';

describe('ResponsableRayonService', () => {
  let service: ResponsableRayonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableRayonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
