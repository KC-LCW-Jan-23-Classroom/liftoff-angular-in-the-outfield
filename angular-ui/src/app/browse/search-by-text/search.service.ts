import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, map } from 'rxjs';
import { ApikeyService } from 'src/app/shared/apikey.service';
import { Movie } from 'src/app/shared/movie.model';
import { MoviesService } from 'src/app/shared/movies.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private totalPagesSubject = new BehaviorSubject<number>(0);
  totalPages$ = this.totalPagesSubject.asObservable();

  private responseMoviesSubject = new BehaviorSubject<Movie[]>([]);
  responseMovies$ = this.responseMoviesSubject.asObservable();

  private currentPage: number = 1;

  constructor(
    private http: HttpClient,
    private apiKeyService: ApikeyService,
    private moviesService: MoviesService
  ) {}

  searchMoviesBySearchTerm(searchTerm: string, page: number): Observable<number[]> {
    return this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        this.currentPage = page;
        return this.fetchMovieIds(apiKey, searchTerm, page);
      })
    );
  }

  private fetchMovieIds(apiKey: string, searchTerm: string, page: number): Observable<number[]> {
    const pageSize = 20;
    const url = `${this.moviesService.getApiUrl()}/search/movie`;
    const params = new HttpParams()
      .set('api_key', apiKey)
      .set('query', searchTerm)
      .set('language', 'en-US')
      .set('page', page.toString());

    return this.http.get<any>(url, { params }).pipe(
      map((response) => {
        const movieIds = response.results.map((movie: any) => movie.id);
        this.totalPagesSubject.next(Math.ceil(response.total_results / pageSize));
        return movieIds;
      })
    );
  }

  setResponseMovies(searchTerm: string, page: number) {
    this.searchMoviesBySearchTerm(searchTerm, page).subscribe((response) => {
      let movieIds: number[] = response;

      this.moviesService.fetchMovieListDetails(movieIds).subscribe((movieListDetails) => {
        this.responseMoviesSubject.next(movieListDetails);
      });
    });
  }

  getResponseMovies() {
    return this.responseMovies$;
  }
}
