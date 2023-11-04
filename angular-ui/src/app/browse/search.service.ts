import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  switchMap,
  map,
  first,
  of,
  forkJoin,
} from 'rxjs';
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

  private loadingMoviesSubject = new BehaviorSubject<boolean>(false);
  loadingMovies$ = this.loadingMoviesSubject.asObservable();

  private personMovieIds: number[] = [];
  private start: number = 0;
  private end: number = 0;

  constructor(
    private http: HttpClient,
    private apiKeyService: ApikeyService,
    private moviesService: MoviesService
  ) {}

  setSearchInput(searchInput: string) {
    this.searchInputSubject.next(searchInput);
  }

  loadMovieIdsInBatches(
    apiKey: string,
    searchTerm: string,
    page: number
  ): Observable<number[]> {
    return this.fetchPeopleIds(apiKey, searchTerm, page).pipe(
      switchMap((peopleIds) => {
        // Load movie IDs in batches, e.g., 20 at a time
        const batchSize = 20;
        const observables: Observable<number[]>[] = [];

        for (let i = 0; i < peopleIds.length; i += batchSize) {
          const batch = peopleIds.slice(i, i + batchSize);
          observables.push(this.fetchMovieIdsForPeople(apiKey, batch));
        }

        return forkJoin(observables).pipe(
          map((responses) => ([] as number[]).concat(...responses))
        );
      })
    );
  }

  searchMoviesByPerson(searchTerm: string): void {
    this.loadingMoviesSubject.next(true); // Set loading flag to true
    this.searchTypeSubject.next('person');

    this.apiKeyService
      .getApiKey()
      .pipe(
        switchMap((apiKey) => this.loadMovieIdsInBatches(apiKey, searchTerm, 1))
      )
      .subscribe((responses) => {
        const movieIds: number[] = responses.flat(); // Flatten the arrays
        this.personMovieIds = movieIds;

        // Continue with displaying the first batch of movies or updating the UI as needed
        this.displayNextBatch();
      });
  }

  displayNextBatch(): void {
    this.loadingMoviesSubject.next(true);

    // Determine the range of movies to load in the current batch
    const batchSize = 20;
    const startIndex = this.start;
    let endIndex = startIndex + batchSize;

    // Ensure endIndex does not exceed the length of personMovieIds
    if (endIndex > this.personMovieIds.length) {
      endIndex = this.personMovieIds.length;
    }

    const nextMovieIds = this.personMovieIds.slice(startIndex, endIndex);

    // Filter out movieIds that have already been added to responseMoviesSubject
    const currentMovies = this.responseMoviesSubject.value;
    const newMovies = nextMovieIds.filter(
      (id: number) => !currentMovies.some((movie) => movie.id === id)
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
          this.loadingMoviesSubject.next(false);
        });
    } else {
      this.loadingMoviesSubject.next(false);
    }

    // Update the start index for the next batch
    this.start = endIndex;
  }

  searchMoviesByTitle(searchTerm: string, page: number): void {
    this.loadingMoviesSubject.next(true);
    this.currentPageSubject.next(page);

    this.searchTypeSubject.next('movie');

    if (this.loadedPages.includes(page)) {
      this.loadingMoviesSubject.next(false);
      return;
    }

    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page);

    this.http
      .get<Movie[]>('http://localhost:8080/search/title', { params })
      .subscribe((response) => {
        const currentMovies: Movie[] = this.responseMoviesSubject.value;
        const newMovies: Movie[] = response;

        if (newMovies.length > 0) {
          this.responseMoviesSubject.next([...currentMovies, ...newMovies]);

          this.loadingMoviesSubject.next(false);
        }
      });

    this.loadedPages.push(page);
  }

  private fetchPeopleIds(
    apiKey: string,
    searchTerm: string,
    page: number
  ): Observable<number[]> {
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
  private fetchMovieIdsForPerson(
    apiKey: string,
    personId: number
  ): Observable<number[]> {
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
  private fetchMovieIdsForPeople(
    apiKey: string,
    peopleIds: number[]
  ): Observable<number[]> {
    // Create a Set to store unique movie IDs
    const allMovieIds: Set<number> = new Set();

    // Recursive function to process each person ID
    const processPerson = (index: number): Observable<number[]> => {
      if (index < peopleIds.length) {
        const personId = peopleIds[index];
        return this.fetchMovieIdsForPerson(apiKey, personId).pipe(
          switchMap((movieIds) => {
            // Add unique movie IDs to the Set
            movieIds.forEach((id) => allMovieIds.add(id));

            // Process the next person ID
            return processPerson(index + 1);
          })
        );
      } else {
        // Convert the Set to an array and return the combined movie IDs
        return of(Array.from(allMovieIds));
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
    this.start = 0;
    this.end = 0;
    this.personMovieIds = [];
    this.loadedPages = [];
  }
}
