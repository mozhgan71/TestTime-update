import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInMongodbComponent } from './compare-in-mongodb.component';

describe('CompareInMongodbComponent', () => {
  let component: CompareInMongodbComponent;
  let fixture: ComponentFixture<CompareInMongodbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInMongodbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInMongodbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
