import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.model';
import { UsersService } from '../../shared/users.service';
import { MoviesService } from 'src/app/shared/movies.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-watch-history',
  templateUrl: './watch-history.component.html',
  styleUrls: ['./watch-history.component.css'],
})
export class WatchHistoryComponent implements OnInit {
  watchedList: Movie[] = [];
  loggedIn: boolean = false;
  loading: boolean = false;

  constructor(private usersService: UsersService, private moviesService : MoviesService, private authService: AuthService) {

  }

  // call backend to recieve a list of movie Ids that the user has added to their watch list
  ngOnInit(): void {
    // this.authService.checkLoggedIn().subscribe((loggedInStatus)=>{
    //   this.loggedIn = loggedInStatus;
    // });
    this.loading = true;

    this.usersService.fetchWatchHistory().subscribe((watchHisory)=>{
      this.watchedList = watchHisory;
      this.loading = false;
    });
  }

  deleteFromWatchHistory(movie : Movie) : void {
    this.usersService.deleteWatchedMovie(movie).subscribe();
    let index = this.watchedList.indexOf(movie);
    this.watchedList.splice(index, 1);
  }


}
