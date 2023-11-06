import { HttpClient, HttpContext, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchedMovie } from './watched-movie.model';
import { Movie } from './movie.model';
import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UsersService implements OnInit {

  private backendUrl = 'http://localhost:8080/'
  public currentUser = new User(1, 'popcorn', 'popcorn');

  //TODO in login method, set currentUser


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWatchHistory();
  }

  fetchWatchHistory(): Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/watch_history/"+this.currentUser.id);
  }
  addWatchedMovie(movie : Movie): Observable<WatchedMovie> {
    const url = `${this.backendUrl}api/watch_history/add`;
    let newWatchedMovie = new WatchedMovie(movie.id, this.currentUser);
    console.log(newWatchedMovie);
    return this.http.post<WatchedMovie>(url, newWatchedMovie, httpOptions);
  }


}
