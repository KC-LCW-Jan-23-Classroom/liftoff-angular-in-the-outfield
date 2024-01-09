import { Component, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { UsersService } from '../users.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-watched-button',
  templateUrl: './watched-button.component.html',
  styleUrls: ['./watched-button.component.css']
})
export class WatchedButtonComponent {
  @Input() thisMovie!: Movie;
  watchedList: Movie[]=[];
  checkWatched = new BehaviorSubject("Unwatched");
  usersService: UsersService;

  constructor(userService: UsersService) {
    this.usersService = userService;
  }

  ngOnInit(): void {
    this.usersService.fetchWatchHistory().subscribe((watchHisory)=>{
      this.watchedList = watchHisory;
      this.thisMovie.isWatched = this.thisMovie.containsMovie(this.watchedList);
      this.checkWatched.next(this.checkIfWatched());
    });
  }

  checkIfWatched(): string {
    if (this.thisMovie.isWatched) {
      return "Watched";
    }
    return "Unwatched";

  }

  onWatchedClick(movie: Movie) : void {
    if (this.thisMovie.isWatched) {
      let answer = window.confirm("You already added this movie to your watch list. Are you sure you want to remove it?");
      if (answer) {
        this.usersService.deleteWatchedMovie(movie);
      }

    }
    this.usersService.addWatchedMovie(movie);
    this.thisMovie.isWatched = true;
  }

}
