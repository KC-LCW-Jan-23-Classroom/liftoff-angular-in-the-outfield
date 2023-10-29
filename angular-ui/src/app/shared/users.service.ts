import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface WatchedMovie {
  movieId: number;
  apiMovieId: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService implements OnInit {

  private backendUrl = 'http://localhost:8080/'
  private currentUserId: number = 1;

  //TODO in login method, set currentUserId


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWatchHistory();
  }

  fetchWatchHistory(): Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/watch_history/"+this.currentUserId);
  }
  addWatchedMovie(movieId: number): void {
    // this.http.post<movieId>(this.backendUrl+"api/watch_history/"+this.currentUserId+"/add")
  }


}
