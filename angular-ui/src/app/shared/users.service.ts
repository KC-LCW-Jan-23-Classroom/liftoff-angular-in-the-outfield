import { HttpClient, HttpContext, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedMovie } from './saved-movie.model';
import { Movie } from './movie.model';
import { User } from './user.model';
import { MoviesService } from './movies.service';

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
  private currentUserId = 1;
  private watchHistory : Movie[] = [];
  private myList : Movie[] = [];


  //TODO in login method, set currentUserId

  constructor(private http: HttpClient, moviesService: MoviesService) { }


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
