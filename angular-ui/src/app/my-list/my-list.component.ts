import { Component } from '@angular/core';
import { Movie } from '../shared/movie.model';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent {
  myList: Movie[] = [];

}
