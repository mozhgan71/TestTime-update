import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CplusQuestionsComponent } from './cplus-questions.component';

describe('CplusQuestionsComponent', () => {
  let component: CplusQuestionsComponent;
  let fixture: ComponentFixture<CplusQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CplusQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CplusQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
