import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInReactComponent } from './compare-in-react.component';

describe('CompareInReactComponent', () => {
  let component: CompareInReactComponent;
  let fixture: ComponentFixture<CompareInReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInReactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
