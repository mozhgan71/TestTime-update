import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhpQuestionsComponent } from './php-questions.component';

describe('PhpQuestionsComponent', () => {
  let component: PhpQuestionsComponent;
  let fixture: ComponentFixture<PhpQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhpQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhpQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
