import { HttpClient, HttpContext, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WatchedMovie } from './watched-movie.model';
import { UserReview } from './user-review.model';

import { SavedMovie } from './saved-movie.model';

import { Movie } from './movie.model';
import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit {

  private backendUrl = 'http://localhost:8080/';
  public currentUser = new User(1, 'popcorn', 'popcorn');
  public userReviews: UserReview[] = [];

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchWatchHistory();
    this.getAllReviews();
  }

  getAllReviews(): Observable<UserReview[]> {
    const reviewsUrl = this.backendUrl + 'api/reviews/user-reviews';
    return this.http.get<UserReview[]>(reviewsUrl);
  }

  fetchWatchHistory(): Observable<number[]> {

    return this.http.get<number[]>(
      this.backendUrl + 'api/watch_history/' + this.currentUser.id
    );
  }
  addWatchedMovie(movie: Movie): Observable<WatchedMovie> {

    const url = `${this.backendUrl}api/watch_history/add`;
    let newWatchedMovie = new SavedMovie(movie.id, this.currentUserId);
    console.log(newWatchedMovie);
    return this.http.post<SavedMovie>(url, newWatchedMovie, httpOptions);
  }

  fetchSavedMovies() : Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/saved_movies/"+this.currentUserId);
  }
  addSavedMovie(movie : Movie) : Observable<SavedMovie> {
    const url = `${this.backendUrl}api/saved_movies/add`;
    let newSavedMoive = new SavedMovie(movie.id, this.currentUserId);
    console.log(newSavedMoive);
    return this.http.post<SavedMovie>(url, newSavedMoive, httpOptions);
  }
}
