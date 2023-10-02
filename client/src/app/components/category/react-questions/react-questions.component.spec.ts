import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactQuestionsComponent } from './react-questions.component';

describe('ReactQuestionsComponent', () => {
  let component: ReactQuestionsComponent;
  let fixture: ComponentFixture<ReactQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
