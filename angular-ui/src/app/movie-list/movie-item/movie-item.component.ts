import { Component, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { apiMovie } from '../apiMovie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  @Input() movieItem!: apiMovie;
}
