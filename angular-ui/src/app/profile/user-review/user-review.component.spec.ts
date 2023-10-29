import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< Updated upstream
import { ProfileInformationComponent } from './user-review.component';

describe('ProfileInformationComponent', () => {
  let component: ProfileInformationComponent;
  let fixture: ComponentFixture<ProfileInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInformationComponent],
    });
    fixture = TestBed.createComponent(ProfileInformationComponent);
=======
import { UserReviewComponent } from './user-review.component';

describe('UserReviewComponent', () => {
  let component: UserReviewComponent;
  let fixture: ComponentFixture<UserReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReviewComponent],
    });
    fixture = TestBed.createComponent(UserReviewComponent);
>>>>>>> Stashed changes
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
