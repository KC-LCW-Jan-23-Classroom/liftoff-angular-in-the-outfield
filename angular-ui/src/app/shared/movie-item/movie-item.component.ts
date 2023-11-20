import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../movie.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { MoviesService } from '../movies.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1200ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MovieItemComponent implements OnInit {
  @Input() movieItem!: Movie;
  @Output() markWatched: EventEmitter<Movie> = new EventEmitter();
  @Output() markSaved: EventEmitter<Movie> = new EventEmitter();
  watchedList: Movie[]=[];
  savedMovieList:  Movie[]=[];
  savedIconURL: string = 'assets/images/minus.svg';
  toSaveIconURL: string = 'assets/images/plus.svg';
  moviesService: MoviesService;
  usersService: UsersService;

  constructor(moviesService: MoviesService, userService: UsersService) {
    this.moviesService = moviesService;
    this.usersService = userService;

  }

  ngOnInit(): void {
    this.usersService.fetchWatchHistory().subscribe((watchHisory)=>{
      let watchedMovieIds: number[] = watchHisory;

      this.moviesService
      .fetchMovieListDetails(watchedMovieIds)
      .subscribe((movieListDetails) => {
        this.watchedList = movieListDetails;
      });
    });

    this.usersService.fetchSavedMovies().subscribe((savedMovies)=>{
      let savedMovieIds: number[] = savedMovies;

      this.moviesService
      .fetchMovieListDetails(savedMovieIds)
      .subscribe((movieListDetails) => {
        this.savedMovieList = movieListDetails;
      });
    });
    this.movieItem.isSaved = this.savedMovieList.includes(this.movieItem);
    this.movieItem.isWatched = this.watchedList.includes(this.movieItem);

  }
  

  onWatchedClick(movie: Movie) : void {
    this.markWatched.emit(movie);
    this.movieItem.isWatched = true;
  }
  onSaveClick(movie: Movie) : void {
    this.markSaved.emit(movie);
    this.movieItem.isSaved = true;
  }

  checkIfSaved(): string {
    if (this.movieItem.isSaved) {
      return this.savedIconURL;
    }
    return this.toSaveIconURL;
  }

  checkIfWatched(): string {
    if (this.movieItem.isWatched) {
      return "Watched";
    }
    return "Unwatched";

  }
}
