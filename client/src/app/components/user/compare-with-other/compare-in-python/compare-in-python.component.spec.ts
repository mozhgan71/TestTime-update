import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInPythonComponent } from './compare-in-python.component';

describe('CompareInPythonComponent', () => {
  let component: CompareInPythonComponent;
  let fixture: ComponentFixture<CompareInPythonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInPythonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInPythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
