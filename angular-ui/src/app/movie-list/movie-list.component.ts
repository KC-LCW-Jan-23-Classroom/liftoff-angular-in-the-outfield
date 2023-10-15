import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList!: Movie[];
  formattedDate: string | null;

  constructor(private moviesService: MoviesService, private datePipe: DatePipe) {
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
  }
}
