import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.model';
import { UsersService } from '../../shared/users.service';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-watch-history',
  templateUrl: './watch-history.component.html',
  styleUrls: ['./watch-history.component.css'],
})
export class WatchHistoryComponent implements OnInit {
  watchedList: Movie[] = [];

  constructor(private usersService: UsersService, private moviesService : MoviesService) {

  }

  // call backend to recieve a list of movie Ids that the user has added to their watch list
  ngOnInit(): void {
    this.usersService.fetchWatchHistory().subscribe((watchHisory)=>{
      let watchedMovieIds: number[] = watchHisory;

      this.moviesService
      .fetchMovieListDetails(watchedMovieIds)
      .subscribe((movieListDetails) => {
        this.watchedList = movieListDetails;
      });
    });
  }


}
