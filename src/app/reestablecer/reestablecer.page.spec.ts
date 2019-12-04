import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestablecerPage } from './reestablecer.page';

describe('ReestablecerPage', () => {
  let component: ReestablecerPage;
  let fixture: ComponentFixture<ReestablecerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReestablecerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
