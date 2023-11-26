import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { UserReview } from '../shared/user-review.model';
import { ReviewsService } from '../shared/reviews.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userReviews: UserReview[] = [];
user: any;
authService: any;

  constructor(
    private userService: UsersService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.loadUserReviews();
  }

  loadUserReviews() {
    // Update the endpoint to match your backend
    this.userService.getAllReviews().subscribe(
      (reviews) => {
        this.userReviews = reviews;
        console.log(' :( User Reviews:', this.userReviews);
      },
      (error) => {
        console.error('Error fetching user reviews:', error);
      }
    );
  }
}
