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

  getRange(total: number): number[] {
    return new Array(total);
  }

  changePage(searchInput: string, page: number) {
    this.currentPage = page; // Update the current page
    this.visiblePageRange = this.calculateVisiblePageRange(this.currentPage, this.totalPages);
    this.searchService.searchMoviesBySearchTerm(searchInput, page);
  }
  
  calculateVisiblePageRange(currentPage: number, totalPages: number, visiblePageCount: number = 10): number[] {
    const half = Math.floor(visiblePageCount / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(start + visiblePageCount - 1, totalPages);
  
    while (end - start + 1 < visiblePageCount && start > 1) {
      start--;
    }
  
    while (end - start + 1 < visiblePageCount && end < totalPages) {
      end++;
    }
  
    const range: number[] = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  
    return range;
  }

  getVisiblePageRange(totalPages: number): number[] {
    const visiblePageCount = 10; // Set the number of visible pages
    const range = [];
    const half = Math.floor(visiblePageCount / 2);
    
    let start = Math.max(1, this.currentPage - half);
    let end = start + visiblePageCount - 1;
  
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePageCount + 1);
    }
  
    // If current page is near the end, adjust the start
    if (this.currentPage + half > totalPages) {
      start = Math.max(1, totalPages - visiblePageCount + 1);
    }
  
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  
    return range;
  }
}
