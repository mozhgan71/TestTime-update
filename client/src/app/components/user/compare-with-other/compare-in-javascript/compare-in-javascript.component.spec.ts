import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInJavaScriptComponent } from './compare-in-javascript.component';

describe('CompareInJavascriptComponent', () => {
  let component: CompareInJavaScriptComponent;
  let fixture: ComponentFixture<CompareInJavaScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareInJavaScriptComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompareInJavaScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
