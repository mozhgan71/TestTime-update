import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInOracleComponent } from './compare-in-oracle.component';

describe('CompareInOracleComponent', () => {
  let component: CompareInOracleComponent;
  let fixture: ComponentFixture<CompareInOracleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInOracleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInOracleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
