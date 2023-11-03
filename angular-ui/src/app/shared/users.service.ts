import { HttpClient, HttpContext, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchedMovie } from './watched-movie.model';

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
  public currentUserId: number = 1;

  //TODO in login method, set currentUserId


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWatchHistory();
  }

  fetchWatchHistory(): Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/watch_history/"+this.currentUserId);
  }
  addWatchedMovie(newWatchedMovie: WatchedMovie): Observable<WatchedMovie> {
    const url = `${this.backendUrl}api/watch_history/add`;
    console.log(newWatchedMovie);
    return this.http.post<WatchedMovie>(url, newWatchedMovie, httpOptions);
  }


}
