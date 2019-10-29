import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmLoginPage } from './frm-login.page';

describe('FrmLoginPage', () => {
  let component: FrmLoginPage;
  let fixture: ComponentFixture<FrmLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
