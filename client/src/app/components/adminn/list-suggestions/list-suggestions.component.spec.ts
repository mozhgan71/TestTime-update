import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuggestionsComponent } from './list-suggestions.component';

describe('ListSuggestionsComponent', () => {
  let component: ListSuggestionsComponent;
  let fixture: ComponentFixture<ListSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
