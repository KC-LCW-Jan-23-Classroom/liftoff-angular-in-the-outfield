
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/movie.model';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit{

  timesUp: boolean = false;

  randomMovie: Movie = new Movie(
    1,
    'Peter Pan',
    ['Adventure', 'Family', 'Fantasy', 'Romance'],
    2003,
    113,
    '/assets/images/posters/peter-pan.png',
    'In stifling Edwardian London, Wendy Darling mesmerizes her brothers every night with bedtime tales of swordplay, swashbuckling, and the fearsome Captain Hook. But the children become the heroes of an even greater story, when Peter Pan flies into their nursery one night and leads them over moonlit rooftops through a galaxy of stars and to the lush jungles of Neverland. Wendy and her brothers join Peter and the Lost Boys in an exhilarating life--free of grown-up rules--while also facing the inevitable showdown with Hook and his bloodthirsty pirates.',
    'P.J. Hogan',
    ['Jeremy Sumpter', 'Jason Isaacs', 'Olivia Williams'],
    ['Prime']
  );

  movieListOptions: Movie[] =[];


  constructor(private moviesService: MoviesService) {

  }

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
    this.timesUp= false;
    this.randomMovie = this.randomizeMovieSelection(this.movieListOptions);
    this.startTimer();
  }

    randomizeMovieSelection(movies: Movie[]) : Movie {
      let randomNum: number = Math.floor(Math.random()*movies.length);
      return movies[randomNum];
    }
  }
  


