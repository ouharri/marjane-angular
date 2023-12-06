import { TestBed } from '@angular/core/testing';

import { AdminCenterServiceService } from './admin-center-service.service';

describe('AdminCenterServiceService', () => {
  let service: AdminCenterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCenterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
