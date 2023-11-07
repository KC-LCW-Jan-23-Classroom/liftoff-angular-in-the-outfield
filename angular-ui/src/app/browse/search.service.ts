import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { Movie } from 'src/app/shared/movie.model';

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

  private start: number = 0;

  constructor(
    private http: HttpClient,
  ) {}

  setSearchInput(searchInput: string) {
    this.searchInputSubject.next(searchInput);
  }

  searchMoviesByPerson(searchTerm: string, index: number): void {
    this.loadingMoviesSubject.next(true);

    this.searchTypeSubject.next('person');

    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('index', index);

    this.http
      .get<Movie[]>('http://localhost:8080/search/person', { params })
      .subscribe((response) => {
        const currentMovies: Movie[] = this.responseMoviesSubject.value;
        const newMovies: Movie[] = response;

        if (newMovies === null) {
          this.loadingMoviesSubject.next(false);
        } else if (newMovies.length > 0) {
          this.responseMoviesSubject.next([...currentMovies, ...newMovies]);

          this.loadingMoviesSubject.next(false);
        }
      });

      this.start = this.start + 20;
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

        if (newMovies === null) {
          this.loadingMoviesSubject.next(false);
        } else if (newMovies.length > 0) {
          this.responseMoviesSubject.next([...currentMovies, ...newMovies]);

          this.loadingMoviesSubject.next(false);
        }
      });

    this.loadedPages.push(page);
  }

  getResponseMovies(): Observable<Movie[]> {
    return this.responseMovies$;
  }

  getStartIndex(): number {
    return this.start;
  }

  clearResponseMovies() {
    this.responseMoviesSubject.next([]);
    this.currentPageSubject.next(0);
    this.start = 0;
    this.loadedPages = [];
  }
}
