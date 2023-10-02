import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceToFriendsComponent } from './introduce-to-friends.component';

describe('IntroduceToFriendsComponent', () => {
  let component: IntroduceToFriendsComponent;
  let fixture: ComponentFixture<IntroduceToFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroduceToFriendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroduceToFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
