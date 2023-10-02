import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonQuestionsComponent } from './python-questions.component';

describe('PythonQuestionsComponent', () => {
  let component: PythonQuestionsComponent;
  let fixture: ComponentFixture<PythonQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PythonQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PythonQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
