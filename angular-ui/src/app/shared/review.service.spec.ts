import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReview } from './user-review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = '/api/reviews'; // Assuming your backend serves the API at the same origin

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<UserReview[]> {
    return this.http.get<UserReview[]>(this.apiUrl);
  }

  addReview(review: UserReview): Observable<UserReview> {
    return this.http.post<UserReview>(this.apiUrl, review);
  }
}
