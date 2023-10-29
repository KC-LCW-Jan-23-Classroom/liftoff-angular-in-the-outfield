import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { Movie } from '../../shared/movie.model';
import { DatePipe } from '@angular/common';
import { SearchService } from '../search.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];
  formattedDate: string | null;
  totalPages!: number;
  currentPage!: number;
  searchInput!: string;
  searchType!: string;
  showLoadingSpinner!: boolean;

  loading: boolean = false;
  loadingRequested: boolean = false;

  private scrollSubject = new Subject<Event>();

  constructor(
    private moviesService: MoviesService,
    private datePipe: DatePipe,
    private searchService: SearchService
  ) {
    const today = new Date();
    this.formattedDate = this.datePipe.transform(today, 'MMMM d, y');
  }

  ngOnInit(): void {
    this.moviesService.fetchTrendingMoviesIds().subscribe((trendingMovies) => {
      let movieIds: number[] = trendingMovies;

      this.moviesService
        .fetchMovieListDetails(movieIds)
        .subscribe((movieListDetails) => {
          this.movieList = movieListDetails;
        });
    });

    this.searchService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

    this.searchService.getResponseMovies().subscribe((movieListDetails) => {
      this.movieList = movieListDetails;
    });

    this.searchService.currentPage$.subscribe((currentPage) => {
      this.currentPage = currentPage;
    });

    this.searchService.searchInput$.subscribe(
      (searchInput) => (this.searchInput = searchInput)
    );

    this.searchService.searchType$.subscribe(
      (searchType) => (this.searchType = searchType)
    );

    this.searchService.loadingMovies$.subscribe(
      (loadingMovies) => (this.showLoadingSpinner = loadingMovies)
    );

    this.scrollSubject.pipe(debounceTime(500)).subscribe(() => {
      if (this.shouldLoadMore() && !this.loading && !this.loadingRequested) {
        this.loadingRequested = true;
        this.loadMore();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollSubject.next(event);
  }

  shouldLoadMore(): boolean {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    return scrollY + windowHeight >= bodyHeight - 500; // Adjust the threshold as needed
  }

  loadMore() {
    this.loading = true;
    const nextPage = this.currentPage + 1;

    if (this.searchType === 'person') {
      this.searchService.displayNextBatch();
    } else if (this.searchType === 'movie') {
      this.searchService.searchMoviesByTitle(this.searchInput, nextPage);
    }

    // Reset the loading flags
    this.loading = false;
    this.loadingRequested = false;
  }
}
