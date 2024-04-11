import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApiexceptionsComponent } from './list-apiexceptions.component';

describe('ListApiexceptionsComponent', () => {
  let component: ListApiexceptionsComponent;
  let fixture: ComponentFixture<ListApiexceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListApiexceptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListApiexceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
