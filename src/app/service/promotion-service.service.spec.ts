import { TestBed } from '@angular/core/testing';

import { PromotionServiceService } from './promotion-service.service';

describe('PromotionServiceService', () => {
  let service: PromotionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
