import { TestBed } from '@angular/core/testing';

import { CtrlInternetAccessService } from './ctrl-internet-access.service';

describe('CtrlInternetAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtrlInternetAccessService = TestBed.get(CtrlInternetAccessService);
    expect(service).toBeTruthy();
  });
});
