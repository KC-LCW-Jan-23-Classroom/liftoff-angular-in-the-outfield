import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/shared/reviews.service';
import { UserReview } from 'src/app/shared/user-review.model';
import { Router } from '@angular/router'; // Import Router from '@angular/router'

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  movieName: string = '';
  reviewText: string = '';
  reviews: UserReview[] = [];
  userReviews: UserReview[] = [];

  constructor(
    private reviewsService: ReviewsService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  onSubmit(): void {
    this.addReview(this.movieName, this.reviewText);
    this.movieName = '';
    this.reviewText = '';
  }

  loadReviews(): void {
    this.reviewsService.getAllReviews().subscribe(
      (reviews) => {
        this.userReviews = reviews;
      },
      (error) => {
        console.error('Error loading reviews:', error);
      }
    );
  }

  addReview(movieName: string, reviewText: string): void {
    const newReview: UserReview = {
      movieName: movieName,
      reviewText: reviewText,
    };

    this.reviewsService.addReview(newReview).subscribe(
      (review: UserReview) => {
        console.log('Review added successfully:', review);
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }

  // Method to navigate to edit profile route
  editProfile(): void {
    this.router.navigate(['/edit-user-profile']);
  }
}
