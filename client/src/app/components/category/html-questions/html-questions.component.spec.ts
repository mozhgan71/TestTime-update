import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlQuestionsComponent } from './html-questions.component';

describe('HtmlQuestionsComponent', () => {
  let component: HtmlQuestionsComponent;
  let fixture: ComponentFixture<HtmlQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
