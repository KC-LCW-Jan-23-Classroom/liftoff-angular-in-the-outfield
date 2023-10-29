import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, map, first, of } from 'rxjs';
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

  searchMoviesByPerson(searchTerm: string,
    page: number,
  ): void {
    this.loadingMovies = true; // Set loading flag to true
    this.currentPageSubject.next(1);
    this.loadedPages = [];

    this.searchTypeSubject.next('person');

    if (this.loadedPages.includes(page)) {
      this.loadingMovies = false; // Reset loading flag
      return; // Page already loaded, skip loading it again
    }

    this.apiKeyService
      .getApiKey()
      .pipe(
        switchMap((apiKey) => {
            return this.fetchPeopleIds(apiKey, searchTerm, page).pipe(
              switchMap((peopleIds) => {
                // Fetch movie IDs for people
                return this.fetchMovieIdsForPeople(apiKey, peopleIds);
              }))
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

  searchMoviesByTitle(
    searchTerm: string,
    page: number
  ): void {
    this.loadingMovies = true; // Set loading flag to true
    this.currentPageSubject.next(1);
    this.loadedPages = [];

    this.searchTypeSubject.next('movie');

    if (this.loadedPages.includes(page)) {
      this.loadingMovies = false; // Reset loading flag
      return; // Page already loaded, skip loading it again
    }

    this.apiKeyService
      .getApiKey()
      .pipe(
        switchMap((apiKey) => {
            return this.fetchMovieIds(apiKey, searchTerm, page);
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

  private fetchPeopleIds(apiKey: string, searchTerm: string, page: number): Observable<number[]> {
    const url = 'https://api.themoviedb.org/3/search/person';

    // Create a new array to store people IDs
    const peopleIds: number[] = [];

    // Define the query parameters
    const params = new HttpParams()
      .set('api_key', apiKey)
      .set('query', searchTerm)
      .set('page', page.toString())
      .set('include_adult', 'false');

    // Perform the HTTP request to search for people
    return this.http.get<any>(url, { params }).pipe(
      switchMap((response) => {
        // Loop through the results and add people IDs to the array
        for (const person of response.results) {
          peopleIds.push(person.id);
        }

        // Check if there are more pages of results
        if (page < response.total_pages) {
          // Continue fetching the next page
          return this.fetchPeopleIds(apiKey, searchTerm, page + 1);
        } else {
          // All pages have been processed, return the array of people IDs
          return of(peopleIds);
        }
      })
    );
  }

  // Function to fetch movie IDs for a given person ID
  private fetchMovieIdsForPerson(apiKey: string, personId: number): Observable<number[]> {
    const url = `https://api.themoviedb.org/3/person/${personId}/movie_credits`;

    // Create an array to store movie IDs
    const movieIds: number[] = [];

    // Define the query parameters
    const params = new HttpParams().set('api_key', apiKey);

    // Perform the HTTP request to fetch movie credits for the person
    return this.http.get<any>(url, { params }).pipe(
      map((response) => {
        // Loop through the movie credits and add movie IDs to the array
        for (const credit of response.cast) {
          movieIds.push(credit.id);
        }
        for (const credit of response.crew) {
          movieIds.push(credit.id);
        }
        return movieIds;
      })
    );
  }

  // Function to fetch movie IDs for all people in the array
  private fetchMovieIdsForPeople(apiKey: string, peopleIds: number[]): Observable<number[]> {
    // Create an array to store all movie IDs
    const allMovieIds: number[] = [];

    // Recursive function to process each person ID
    const processPerson = (index: number): Observable<number[]> => {
      if (index < peopleIds.length) {
        const personId = peopleIds[index];
        return this.fetchMovieIdsForPerson(apiKey, personId).pipe(
          switchMap((movieIds) => {
            allMovieIds.push(...movieIds);

            // Process the next person ID
            return processPerson(index + 1);
          })
        );
      } else {
        // All people have been processed, return the combined movie IDs
        return of(allMovieIds);
      }
    };

    // Start processing the first person ID
    return processPerson(0);
  }

  getResponseMovies(): Observable<Movie[]> {
    return this.responseMovies$;
  }

  clearResponseMovies() {
    this.responseMoviesSubject.next([]);
    this.currentPageSubject.next(0);
  }
}
