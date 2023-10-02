import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularQuestionsComponent } from './angularquestions.component';

describe('AngularquestionsComponent', () => {
  let component: AngularQuestionsComponent;
  let fixture: ComponentFixture<AngularQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AngularQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
