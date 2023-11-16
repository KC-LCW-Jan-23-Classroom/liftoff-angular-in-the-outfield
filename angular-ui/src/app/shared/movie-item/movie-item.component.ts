import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../movie.model';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class MovieItemComponent {
  @Input() movieItem!: Movie;
  @Output() markWatched: EventEmitter<Movie> = new EventEmitter();
  @Output() markSaved: EventEmitter<Movie> = new EventEmitter();

  onWatchedClick(movie: Movie) : void {
    this.markWatched.emit(movie);
  }
  onSaveClick(movie: Movie) : void {
    this.markSaved.emit(movie);
  }

  // checkIfSaved(): string {
  //   if (this.isMovieSaved) {
  //     return this.savedIconURL;
  //   }
  //   return this.toSaveIconURL;
  // }

  // checkIfWatched(): string {
  //   if (this.isMovieWatched) {
  //     return "Watched";
  //   }
  //   return "Unwatched";

  // }
}
