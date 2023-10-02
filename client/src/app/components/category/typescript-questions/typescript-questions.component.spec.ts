import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeScriptQuestionsComponent } from './typescript-questions.component';

describe('TypescriptQuestionsComponent', () => {
  let component: TypeScriptQuestionsComponent;
  let fixture: ComponentFixture<TypeScriptQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeScriptQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TypeScriptQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
