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

  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  private searchInputSubject = new BehaviorSubject<string>('');
  searchInput$ = this.searchInputSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiKeyService: ApikeyService,
    private moviesService: MoviesService
  ) {}

  setSearchInput(searchInput: string) {
    this.searchInputSubject.next(searchInput);
  }

  searchMoviesBySearchTerm(searchTerm: string, page: number): void {
    this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        
        return this.fetchMovieIds(apiKey, searchTerm, page);
      })
    ).subscribe((response) => {
      const movieIds: number[] = response;

      this.moviesService.fetchMovieListDetails(movieIds).subscribe((movieListDetails) => {
        this.responseMoviesSubject.next([...this.responseMoviesSubject.value, ...movieListDetails])
        this.currentPageSubject.next(this.currentPageSubject.value + 1);
      });
    });
  }

  private fetchMovieIds(apiKey: string, searchTerm: string, page: number): Observable<number[]> {
    const pageSize = 20;
    const url = `${this.moviesService.getApiUrl()}/search/movie`;
    const params = new HttpParams()
      .set('api_key', apiKey)
      .set('query', searchTerm)
      .set('language', 'en-US')
      .set('page', page.toString())
      .set('include_adult', false);

    return this.http.get<any>(url, { params }).pipe(
      map((response) => {
        const movieIds = response.results.map((movie: any) => movie.id);
        this.totalPagesSubject.next(Math.ceil(response.total_results / pageSize));
        return movieIds;
      })
    );
  }

  getResponseMovies(): Observable<Movie[]> {
    return this.responseMovies$;
  }
}
