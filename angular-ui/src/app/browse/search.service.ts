import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, map, first } from 'rxjs';
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

  private searchTypeSubject = new BehaviorSubject<string>('');
  searchType$ = this.searchTypeSubject.asObservable();

  private loadedPages: number[] = [];

  public loadingMovies: boolean = false;

  constructor(
    private http: HttpClient,
    private apiKeyService: ApikeyService,
    private moviesService: MoviesService
  ) {}

  setSearchInput(searchInput: string) {
    this.searchInputSubject.next(searchInput);
  }

  searchMoviesBySearchTerm(searchTerm: string, page: number, searchType: string): void {
    this.loadingMovies = true; // Set loading flag to true
    this.currentPageSubject.next(1);
    this.loadedPages = [];
    
    this.searchTypeSubject.next(searchType)

    if (this.loadedPages.includes(page)) {
      this.loadingMovies = false; // Reset loading flag
      return; // Page already loaded, skip loading it again
    }

    this.apiKeyService
      .getApiKey()
      .pipe(
        switchMap((apiKey) => {
          if (searchType === 'person') {
            // Search for a person
            return this.fetchPersonIds(apiKey, searchTerm, page);
          } else {
            // Search for a movie
            return this.fetchMovieIds(apiKey, searchTerm, page);
          }
        })
      )
      .subscribe((response) => {
        const movieIds: number[] = response;

        // Filter out movieIds that have already been added to responseMoviesSubject
        const currentMovies = this.responseMoviesSubject.value;
        const newMovies = movieIds.filter(
          (id) => !currentMovies.some((movie) => movie.id === id)
        );

        if (newMovies.length > 0) {
          // Append new results to the existing ones
          this.moviesService
            .fetchMovieListDetails(newMovies)
            .subscribe((movieListDetails) => {
              this.responseMoviesSubject.next([
                ...currentMovies,
                ...movieListDetails,
              ]);
            });
        }

        this.totalPages$.pipe(first()).subscribe((totalPages) => {
          if (page < totalPages) {
            this.currentPageSubject.next(page + 1); // Load the next page
          }
        });
      });

    this.loadedPages.push(page);
    this.loadingMovies = false; // Reset loading flag
  }

  private fetchMovieIds(
    apiKey: string,
    searchTerm: string,
    page: number
  ): Observable<number[]> {
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
        this.totalPagesSubject.next(
          Math.ceil(response.total_results / pageSize)
        );
        return movieIds;
      })
    );
  }

  private fetchPersonIds(
    apiKey: string,
    searchTerm: string,
    page: number
  ): Observable<number[]> {
    // Implement the logic to search for a person and return their IDs.
    // You'll need to query the appropriate API endpoint for people search.
  }


  getResponseMovies(): Observable<Movie[]> {
    return this.responseMovies$;
  }

  clearResponseMovies() {
    this.responseMoviesSubject.next([]);
    this.currentPageSubject.next(0);
  }
}
