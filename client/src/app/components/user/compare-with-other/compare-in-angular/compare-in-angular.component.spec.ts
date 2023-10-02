import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInAngularComponent } from './compare-in-angular.component';

describe('CompareInAngularComponent', () => {
  let component: CompareInAngularComponent;
  let fixture: ComponentFixture<CompareInAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
