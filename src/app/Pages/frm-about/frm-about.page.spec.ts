import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmAboutPage } from './frm-about.page';

describe('FrmAboutPage', () => {
  let component: FrmAboutPage;
  let fixture: ComponentFixture<FrmAboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmAboutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
