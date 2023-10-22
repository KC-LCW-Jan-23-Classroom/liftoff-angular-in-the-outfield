import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface UserReview {
  movieName: string;
  reviewText: string;
}

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css'],
})
export class UserReviewComponent {
  userReviews: UserReview[] = [];
  movieName: string = ''; // property to store the movie name
  reviewText: string = ''; // property to store the review text

  submitForm() {
    const newReview: UserReview = {
      movieName: this.movieName,
      reviewText: this.reviewText,
    };

    this.userReviews.push(newReview);

    this.movieName = '';
    this.reviewText = '';

    console.log(newReview);
  }
}
