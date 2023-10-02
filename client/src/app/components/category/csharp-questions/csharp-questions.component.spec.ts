import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpQuestionsComponent } from './csharp-questions.component';

describe('CsharpQuestionsComponent', () => {
  let component: CsharpQuestionsComponent;
  let fixture: ComponentFixture<CsharpQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsharpQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsharpQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
