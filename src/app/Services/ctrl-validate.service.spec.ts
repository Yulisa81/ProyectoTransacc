import { TestBed } from '@angular/core/testing';

import { CtrlValidateService } from './ctrl-validate.service';

describe('CtrlValidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtrlValidateService = TestBed.get(CtrlValidateService);
    expect(service).toBeTruthy();
  });
});
