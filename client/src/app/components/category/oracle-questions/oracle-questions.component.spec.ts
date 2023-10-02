import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleQuestionsComponent } from './oracle-questions.component';

describe('OracleQuestionsComponent', () => {
  let component: OracleQuestionsComponent;
  let fixture: ComponentFixture<OracleQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OracleQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
