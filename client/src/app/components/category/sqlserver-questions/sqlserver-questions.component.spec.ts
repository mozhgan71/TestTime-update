import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlServerQuestionsComponent } from './sqlserver-questions.component';

describe('SqlserverQuestionsComponent', () => {
  let component: SqlServerQuestionsComponent;
  let fixture: ComponentFixture<SqlServerQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SqlServerQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SqlServerQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
