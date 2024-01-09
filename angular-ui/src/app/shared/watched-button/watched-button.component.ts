import { Component, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-watched-button',
  templateUrl: './watched-button.component.html',
  styleUrls: ['./watched-button.component.css']
})
export class WatchedButtonComponent {
  @Input() movieItem!: Movie;
  watchedList: Movie[]=[];
  usersService: UsersService;

  constructor(userService: UsersService) {
    this.usersService = userService;
  }

  ngOnInit(): void {
    this.usersService.fetchWatchHistory().subscribe((watchHisory)=>{
      this.watchedList = watchHisory;
      this.movieItem.isWatched = this.movieItem.containsMovie(this.watchedList);
    });
  }

  checkIfWatched(): string {
    if (this.movieItem.isWatched) {
      return "Watched";
    }
    return "Unwatched";

  }

  onWatchedClick(movie: Movie) : void {
    if (this.movieItem.isWatched) {

    }
    this.usersService.addWatchedMovie(movie);
    this.movieItem.isWatched = true;
  }

}
