import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogInComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  let component: AdminLogInComponent;
  let fixture: ComponentFixture<AdminLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLogInComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
