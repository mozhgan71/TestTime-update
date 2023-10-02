import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssQuestionsComponent } from './css-questions.component';

describe('CssQuestionsComponent', () => {
  let component: CssQuestionsComponent;
  let fixture: ComponentFixture<CssQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
