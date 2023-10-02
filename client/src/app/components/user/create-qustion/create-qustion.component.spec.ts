import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQustionComponent } from './create-qustion.component';

describe('CreateQustionComponent', () => {
  let component: CreateQustionComponent;
  let fixture: ComponentFixture<CreateQustionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQustionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQustionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
