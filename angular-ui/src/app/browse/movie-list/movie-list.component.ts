import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { Movie } from '../../shared/movie.model';
import { DatePipe } from '@angular/common';
import { SearchService } from '../search.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];
  formattedDate: string | null;
  totalPages!: number;
  currentPage!: number;
  searchInput!: string;

  constructor(
    private moviesService: MoviesService,
    private datePipe: DatePipe,
    private searchService: SearchService,
    private http: HttpClient
  ) {
    const today = new Date();
    this.formattedDate = this.datePipe.transform(today, 'MMMM d, y');
  }

  ngOnInit(): void {
    this.http
      .get<Movie[]>('http://localhost:8080/api/trending')
      .subscribe((response) => {
        this.movieList = response;
      });

    this.searchService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

    this.searchService.getResponseMovies().subscribe((movieListDetails) => {
      this.movieList = movieListDetails;
    });

    this.searchService.currentPage$.subscribe((currentPage) => {
      this.currentPage = currentPage;
    });

    this.searchService.searchInput$.subscribe(
      (searchInput) => (this.searchInput = searchInput)
    );
  }

  changePage(searchInput: string, page: number) {
    console.log(page);
    this.searchService.searchMoviesBySearchTerm(searchInput, page);
  }
}
