import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { Movie } from '../../shared/movie.model';
import { DatePipe } from '@angular/common';
import { SearchService } from '../search.service';
import { UsersService } from 'src/app/shared/users.service';
import { WatchedMovie } from 'src/app/shared/watched-movie.model';

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

  constructor(
    private moviesService: MoviesService,
    private datePipe: DatePipe,
    private searchService: SearchService,
    private usersService: UsersService
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

  changePage(searchInput: string, page: number) {
    console.log(page)
    this.searchService.searchMoviesBySearchTerm(searchInput, page);
  }

  addToWatchHistory(movie : Movie) {
    this.usersService.addWatchedMovie(movie).subscribe((WatchedMovie=> {
      
    }));
  }
}
