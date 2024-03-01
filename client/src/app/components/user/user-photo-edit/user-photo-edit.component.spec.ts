import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotoEditComponent } from './user-photo-edit.component';

describe('UserPhotoEditComponent', () => {
  let component: UserPhotoEditComponent;
  let fixture: ComponentFixture<UserPhotoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPhotoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
