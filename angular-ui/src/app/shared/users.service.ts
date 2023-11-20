import { HttpClient, HttpContext, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedMovie } from './saved-movie.model';
import { Movie } from './movie.model';
import { User } from '../user/user';
import { MoviesService } from './movies.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AuthService } from '../user/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService implements OnInit {

  private backendUrl = 'http://localhost:8080/';
  private moviesService : MoviesService;
  public watchHistory : Movie[] =[];
  public savedMovies : Movie[] = [];


  //TODO in login method, set currentUserId

  constructor(private http: HttpClient, moviesService: MoviesService) { 
    this.moviesService = moviesService;
  }


  ngOnInit(): void {


  }

  fetchWatchHistory(): Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/watch_history");
  }

  addWatchedMovie(movie : Movie): Observable<Number> {
    const url = `${this.backendUrl}api/watch_history/add`;
    return this.http.post<Number>(url, movie.id, httpOptions);
  }

  fetchSavedMovies() : Observable<number[]> {
    return this.http.get<number[]>(this.backendUrl+"api/saved_movies");
  }
  addSavedMovie(movie : Movie) : Observable<Number> {
    const url = `${this.backendUrl}api/saved_movies/add`;
    return this.http.post<Number>(url, movie.id, httpOptions);
  }

}
