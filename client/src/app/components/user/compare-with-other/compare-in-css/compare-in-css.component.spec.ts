import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInCssComponent } from './compare-in-css.component';

describe('CompareInCssComponent', () => {
  let component: CompareInCssComponent;
  let fixture: ComponentFixture<CompareInCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInCssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
