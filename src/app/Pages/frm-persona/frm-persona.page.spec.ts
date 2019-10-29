import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPersonaPage } from './frm-persona.page';

describe('FrmPersonaPage', () => {
  let component: FrmPersonaPage;
  let fixture: ComponentFixture<FrmPersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmPersonaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
