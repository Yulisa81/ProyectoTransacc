import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmTransaccionesPage } from './frm-transacciones.page';

describe('FrmTransaccionesPage', () => {
  let component: FrmTransaccionesPage;
  let fixture: ComponentFixture<FrmTransaccionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmTransaccionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmTransaccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
