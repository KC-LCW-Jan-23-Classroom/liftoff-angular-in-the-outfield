import { Component, HostListener, OnInit } from '@angular/core';
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
  movieList: Movie[] = [];
  formattedDate: string | null;
  totalPages!: number;
  currentPage!: number;
  searchInput!: string;

  loading: boolean = false;

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
    })

    this.searchService.searchInput$.subscribe(
      (searchInput) => (this.searchInput = searchInput)
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.shouldLoadMore() && !this.loading) {
      this.loadMore();
    }
  }

  shouldLoadMore(): boolean {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    return scrollY + windowHeight >= bodyHeight - 200; // Adjust the threshold as needed
  }

  loadMore() {
    this.loading = true;
    const nextPage = this.currentPage + 1;
    this.searchService.searchMoviesBySearchTerm(this.searchInput, nextPage);
    this.loading = false;
  }
}
