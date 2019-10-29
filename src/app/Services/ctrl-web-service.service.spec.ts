import { TestBed } from '@angular/core/testing';

import { CtrlWebServiceService } from './ctrl-web-service.service';

describe('CtrlWebServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtrlWebServiceService = TestBed.get(CtrlWebServiceService);
    expect(service).toBeTruthy();
  });
});
