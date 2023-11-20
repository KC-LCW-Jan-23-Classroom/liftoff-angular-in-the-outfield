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
  savedIconURL: string = 'assets/images/minus.svg';
  toSaveIconURL: string = 'assets/images/plus.svg';
  

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
