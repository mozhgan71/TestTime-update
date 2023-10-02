import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInPhpComponent } from './compare-in-php.component';

describe('CompareInPhpComponent', () => {
  let component: CompareInPhpComponent;
  let fixture: ComponentFixture<CompareInPhpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInPhpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInPhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
