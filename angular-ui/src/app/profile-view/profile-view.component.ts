import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../shared/review.service.spec';
import { UserReview } from 'src/app/shared/user-review.model';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  movieName: string = '';
  reviewText: string = '';
  reviews: UserReview[] = [];

  constructor(private reviewsService: ReviewsService) {}

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
      (reviews) => {},
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
}
