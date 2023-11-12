import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReview } from './user-review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8080/api/reviews'; // Assuming your Spring Boot app runs on port 8080

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<UserReview[]> {
    return this.http.get<UserReview[]>(`${this.apiUrl}/user-reviews`);
  }

  addReview(review: UserReview): Observable<UserReview> {
    return this.http.post<UserReview>(this.apiUrl, review);
  }
}
