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
  loading: boolean = false;

  constructor(private usersService: UsersService, private moviesService : MoviesService) {
  }
  
  ngOnInit(): void {
    this.loading = true;
    this.usersService.fetchSavedMovies().subscribe((savedMovies)=>{
      this.myList = savedMovies;
      this.loading = false;
    });
  }

  deleteFromSavedMovies(movie : Movie) : void {
    console.log(movie);
    this.usersService.deleteSavedMovie(movie).subscribe();
    let index = this.myList.indexOf(movie);
    this.myList.splice(index, 1);
  }
  

}
