import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuejsQuestionsComponent } from './vuejs-questions.component';

describe('VuejsQuestionsComponent', () => {
  let component: VuejsQuestionsComponent;
  let fixture: ComponentFixture<VuejsQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuejsQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuejsQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
