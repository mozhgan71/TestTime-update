import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserQuestionsComponent } from './list-userquestions.component';

describe('ListUserquestionsComponent', () => {
  let component: ListUserQuestionsComponent;
  let fixture: ComponentFixture<ListUserQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListUserQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
