
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/movie.model';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit {

  timesUp: boolean = false;

  randomMovie!: Movie;

  movieListOptions: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.fetchTrendingMoviesIds().subscribe((trendingMovies) => {
      let movieIds: number[] = trendingMovies;

      this.moviesService
        .fetchMovieListDetails(movieIds)
        .subscribe((movieListDetails) => {
          this.movieListOptions = movieListDetails;
        });
    });
  }

  startTimer() {
    this.randomMovie = this.randomizeMovieSelection(this.movieListOptions);
    setTimeout(()=> {this.timesUp=true;}, 3000);
  }
  
  restartTimer() {
    this.timesUp = false;
    this.randomMovie = this.randomizeMovieSelection(this.movieListOptions);
    this.startTimer();
  }

    randomizeMovieSelection(movies: Movie[]) : Movie {
      let randomNum: number = Math.floor(Math.random()*movies.length);
      return movies[randomNum];
    }
  }
