import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { UsersService } from '../shared/users.service';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './saved-movies.component.html',
  styleUrls: ['./saved-movies.component.css']
})
export class SavedMoviesComponent implements OnInit {
  myList: Movie[] = [];

  constructor(private usersService: UsersService, private moviesService : MoviesService) {
  }
  
  ngOnInit(): void {
    this.usersService.fetchSavedMovies().subscribe((savedMovies)=>{
      let savedMovieIds: number[] = savedMovies;

      this.moviesService
      .fetchMovieListDetails(savedMovieIds)
      .subscribe((movieListDetails) => {
        this.myList = movieListDetails;
      });
    })
  }
  

}
