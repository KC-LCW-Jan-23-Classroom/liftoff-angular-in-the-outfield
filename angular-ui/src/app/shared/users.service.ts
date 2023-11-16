import { HttpClient, HttpContext, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedMovie } from './saved-movie.model';
import { Movie } from './movie.model';
import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService implements OnInit {

  private backendUrl = 'http://localhost:8080/'
  public currentUserId = 1;

  //TODO in login method, set currentUserId

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWatchHistory();
  }

  fetchWatchHistory(): Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/watch_history/"+this.currentUserId);
  }
  addWatchedMovie(movie : Movie): Observable<SavedMovie> {
    const url = `${this.backendUrl}api/watch_history/add`;
    let newWatchedMovie = new SavedMovie(movie.id, this.currentUserId);
    console.log(newWatchedMovie);
    return this.http.post<SavedMovie>(url, newWatchedMovie, httpOptions);
  }
}
