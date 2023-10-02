import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoDBQuestionsComponent } from './mongodb-questions.component';

describe('MongodbQuestionsComponent', () => {
  let component: MongoDBQuestionsComponent;
  let fixture: ComponentFixture<MongoDBQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MongoDBQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MongoDBQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
