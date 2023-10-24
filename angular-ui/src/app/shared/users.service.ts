import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WatchedMovie {
  movieId: number;
  apiMovieId: number;
  userReview: String;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private backendUrl = 'http://localhost:8080/'
  private currentUserId: number =1;


  constructor(private http: HttpClient) { }

  fetchWatchHistory(): Observable<WatchedMovie[]> {
    return this.http.get<WatchedMovie[]>(this.backendUrl+"/"+this.currentUserId+"watch-history")
  }


}
