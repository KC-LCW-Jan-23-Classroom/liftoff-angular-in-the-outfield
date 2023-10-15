import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { apiMovie } from './apiMovie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private url: string = 'https://api.themoviedb.org/3/';
  private apiKey: string = '6b1a4418de436636a649a2bdf791394e';
  private options = { params: new HttpParams().set('api_key', this.apiKey) };

  constructor(private http: HttpClient) {}

  fetchTrendingMovies(): Observable<number[]> {
    // Make the API request to get trending movies with a limit of 20
    const url = `${this.url}/trending/movie/day?language=en-US&page=1&total_results=20`;
    return this.http.get<any>(url, this.options).pipe(
      // Map the response to extract movie IDs
      map((response) =>
        response.results.slice(0, 20).map((movie: any) => movie.id)
      )
    );
  }

  fetchMovieListDetails(movieList: number[]): Observable<apiMovie[]> {
    // Create an array of Observables for each HTTP request
    const observables = movieList.map((number) => {
      return this.http.get<apiMovie>(
        `${this.url}/movie/${number}?append_to_response=watch%2Fproviders&language=en-US`,
        this.options
      );
    });

    // Use forkJoin to wait for all observables to complete
    return forkJoin(observables).pipe(
      map((responses: apiMovie[]) => {
        // The 'responses' array will contain the results of all HTTP requests
        return responses;
      })
    );
  }
}
