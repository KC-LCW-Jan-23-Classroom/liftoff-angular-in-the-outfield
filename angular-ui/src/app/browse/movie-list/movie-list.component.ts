import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { Movie } from '../../shared/movie.model';
import { DatePipe } from '@angular/common';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList!: Movie[];
  formattedDate: string | null;
  totalPages!: number;
  currentPage!: number;
  searchInput!: string;
  visiblePageRange!: number[];

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
      this.visiblePageRange = this.calculateVisiblePageRange(
        this.currentPage,
        this.totalPages
      );
    });

    this.searchService.getResponseMovies().subscribe((movieListDetails) => {
      this.movieList = movieListDetails;
    });

    this.searchService.currentPage$.subscribe(
      (currentPage) => (this.currentPage = currentPage)
    );

    this.searchService.searchInput$.subscribe(
      (searchInput) => (this.searchInput = searchInput)
    );
  }

  changePage(searchInput: string, page: number, direction?: string) {
    this.currentPage = page; // Update the current page
    this.visiblePageRange = this.calculateVisiblePageRange(
      this.currentPage,
      this.totalPages,
      direction
    );
    this.searchService.searchMoviesBySearchTerm(searchInput, page);
  }

  // works for next button, struggling with previous
  calculateVisiblePageRange(currentPage: number, totalPages: number, direction?: string): number[] {
    let start = currentPage >=  10 ? currentPage - 9 : 1;
    let end = currentPage >= 10 ? currentPage : 10;

    if (direction === 'next') {
      start = currentPage >=  10 ? currentPage - 9 : 1;
      end = currentPage >= 10 ? currentPage : 10;
    } else if (direction === 'previous') {

    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - 9;
    }

    const range: number[] = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    console.log(range)

    return range;
  }
}
