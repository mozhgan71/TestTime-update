import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInHtmlComponent } from './compare-in-html.component';

describe('CompareInHtmlComponent', () => {
  let component: CompareInHtmlComponent;
  let fixture: ComponentFixture<CompareInHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareInHtmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareInHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
