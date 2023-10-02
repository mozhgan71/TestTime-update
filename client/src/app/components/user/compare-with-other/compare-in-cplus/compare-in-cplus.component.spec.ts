import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInCplusComponent } from './compare-in-cplus.component';

describe('CompareInCplusComponent', () => {
  let component: CompareInCplusComponent;
  let fixture: ComponentFixture<CompareInCplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInCplusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInCplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
