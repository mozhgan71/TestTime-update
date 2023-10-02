import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldQuestionsComponent } from './old-questions.component';

describe('OldQuestionsComponent', () => {
  let component: OldQuestionsComponent;
  let fixture: ComponentFixture<OldQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
