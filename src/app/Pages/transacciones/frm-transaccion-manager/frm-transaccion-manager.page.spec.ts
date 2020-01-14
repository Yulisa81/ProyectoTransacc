import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmTransaccionManagerPage } from './frm-transaccion-manager.page';

describe('FrmTransaccionManagerPage', () => {
  let component: FrmTransaccionManagerPage;
  let fixture: ComponentFixture<FrmTransaccionManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmTransaccionManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmTransaccionManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
