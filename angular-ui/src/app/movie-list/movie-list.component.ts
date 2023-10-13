import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList!: Movie[];

  constructor(private moviesService: MoviesService){}

  ngOnInit(): void {
    this.movieList = this.moviesService.getMovies();
  }
}
