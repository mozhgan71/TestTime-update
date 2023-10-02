import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInVuejsComponent } from './compare-in-vuejs.component';

describe('CompareInVuejsComponent', () => {
  let component: CompareInVuejsComponent;
  let fixture: ComponentFixture<CompareInVuejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInVuejsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInVuejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
