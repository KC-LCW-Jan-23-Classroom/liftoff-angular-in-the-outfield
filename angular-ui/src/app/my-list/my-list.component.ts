import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { UsersService } from '../shared/users.service';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  myList: Movie[] = [];

  constructor(private usersService: UsersService, private moviesService : MoviesService) {
  }
  
  ngOnInit(): void {
    
  }
  

}
