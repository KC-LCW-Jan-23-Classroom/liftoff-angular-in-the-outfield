import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { apiMovie } from './apiMovie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList!: apiMovie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.fetchTrendingMovies().subscribe((trendingMovies) => {
      let movieIds: number[] = trendingMovies;

      this.moviesService
        .fetchMovieListDetails(movieIds)
        .subscribe((movieListDetails) => {
          this.movieList = movieListDetails;
          console.log(movieListDetails);
        });
    });
  }
}
