import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaScriptQuestionsComponent } from './javascript-questions.component';

describe('JavascriptQuestionsComponent', () => {
  let component: JavaScriptQuestionsComponent;
  let fixture: ComponentFixture<JavaScriptQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JavaScriptQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JavaScriptQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
