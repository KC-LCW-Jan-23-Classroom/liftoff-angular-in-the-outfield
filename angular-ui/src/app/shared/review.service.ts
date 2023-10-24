import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserReview } from './user-review.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ReviewService {
  abstract getAllReviews(): Observable<UserReview[]>;
  abstract addReview(review: UserReview): Observable<UserReview>;
}
