import { Component } from '@angular/core';
import { Movie } from '../movie-list/movie.model';

@Component({
  selector: 'app-watch-history',
  templateUrl: './watch-history.component.html',
  styleUrls: ['./watch-history.component.css']
})
export class WatchHistoryComponent {
  watchedList: Movie[] = [];

  // call backend to recieve a list of movie Ids that the user has added to their watch list

  // call API with the list of movie Ids to 
  //

}
