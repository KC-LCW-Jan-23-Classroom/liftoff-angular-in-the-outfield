import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8080/api/login'; // Assuming your Spring Boot app runs on port 8080

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addReview(review: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, review);
  }
}