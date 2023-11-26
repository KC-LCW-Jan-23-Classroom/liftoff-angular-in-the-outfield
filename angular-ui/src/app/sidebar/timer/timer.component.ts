
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
  timerRunning: boolean = false;
  minutesInt: number = 5;
  countdownDisplay: string = "";

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

  startTimer(minutes: string = "5") {
    this.timerRunning=true;
    this.minutesInt = parseInt(minutes);
    this.timer(this.minutesInt);
    this.randomMovie = this.randomizeMovieSelection(this.movieListOptions);
    setTimeout(()=> {this.timesUp=true; this.timerRunning=false}, 60000*this.minutesInt);
  }
  
  restartTimer() {
    this.timesUp = false;
    this.randomMovie = this.randomizeMovieSelection(this.movieListOptions);
    this.startTimer();
  }
  reset() {
    this.timesUp = false;
    this.timerRunning= false;
  }

  randomizeMovieSelection(movies: Movie[]) : Movie {
      let randomNum: number = Math.floor(Math.random()*movies.length);
      return movies[randomNum];
  }
  timer(minutes: number) {
    let totalSeconds: number = minutes*60;
    let countingSeconds: number = 60;
    let displaySeconds: any = '00';
    let displayMinutes: any = '00';

    const timer = setInterval(()=> {
      totalSeconds--;
      displayMinutes = Math.floor(totalSeconds/60);
      if (displayMinutes<10) {
        displayMinutes = "0"+displayMinutes;
      }
      if (countingSeconds !== 0) {
        countingSeconds--;
      } else {countingSeconds = 59}
      if (countingSeconds<10) {
        displaySeconds = "0"+countingSeconds;
      } else {displaySeconds = countingSeconds}
      this.countdownDisplay=`${displayMinutes}:${displaySeconds}`;
      if (totalSeconds === 0) {
        clearInterval(timer);
      }
    }, 1000)
  }

}
