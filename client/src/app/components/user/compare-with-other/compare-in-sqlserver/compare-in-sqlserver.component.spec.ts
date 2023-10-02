import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareInSqlServerComponent } from './compare-in-sqlserver.component';

describe('CompareInSqlserverComponent', () => {
  let component: CompareInSqlServerComponent;
  let fixture: ComponentFixture<CompareInSqlServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareInSqlServerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompareInSqlServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
