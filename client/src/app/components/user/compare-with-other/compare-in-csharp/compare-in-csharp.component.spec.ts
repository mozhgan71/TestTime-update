import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInCsharpComponent } from './compare-in-csharp.component';

describe('CompareInCsharpComponent', () => {
  let component: CompareInCsharpComponent;
  let fixture: ComponentFixture<CompareInCsharpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInCsharpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInCsharpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
