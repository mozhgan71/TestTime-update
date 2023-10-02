import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInTypescriptComponent } from './compare-in-typescript.component';

describe('CompareInTypescriptComponent', () => {
  let component: CompareInTypescriptComponent;
  let fixture: ComponentFixture<CompareInTypescriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInTypescriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInTypescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
