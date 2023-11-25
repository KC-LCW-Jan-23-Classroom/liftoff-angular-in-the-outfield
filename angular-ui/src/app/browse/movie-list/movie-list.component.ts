import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.model';
import { DatePipe } from '@angular/common';
import { SearchService } from '../search.service';
import { UsersService } from 'src/app/shared/users.service';
import { SavedMovie } from 'src/app/shared/saved-movie.model';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movieList: Movie[] = [];
  formattedDate: string | null;
  currentPage!: number;
  searchInput!: string;
  searchType!: string;
  showLoadingSpinner!: boolean;

  loading: boolean = false;
  loadingRequested: boolean = false;

  private scrollSubject = new Subject<Event>();
  
  constructor(
    private datePipe: DatePipe,
    private searchService: SearchService,
    private usersService: UsersService,
    private http: HttpClient, private moviesService : MoviesService
  ) {
    const today = new Date();
    this.formattedDate = this.datePipe.transform(today, 'MMMM d, y');
  }

  ngOnInit(): void {

    this.loading = true;
    this.http
      .get<Movie[]>('http://localhost:8080/api/trending')
      .subscribe((response) => {
        this.movieList = response;
        this.loading = false
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

    this.searchService.searchType$.subscribe(
      (searchType) => (this.searchType = searchType)
    );

    this.searchService.loadingMovies$.subscribe(
      (loadingMovies) => (this.showLoadingSpinner = loadingMovies)
    );

    this.scrollSubject.pipe(debounceTime(500)).subscribe(() => {
      if (this.shouldLoadMore() && !this.loading && !this.loadingRequested) {
        this.loadingRequested = true;
        this.loadMore();
      }
    });

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollSubject.next(event);
  }

  shouldLoadMore(): boolean {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    return scrollY + windowHeight >= bodyHeight - 500; // Adjust the threshold as needed
  }

  loadMore() {
    this.loading = true;
    const nextPage = this.currentPage + 1;

    if (this.searchType === 'person') {
      this.searchService.searchMoviesByPerson(this.searchInput, this.searchService.getStartIndex());
    } else if (this.searchType === 'movie') {
      this.searchService.searchMoviesByTitle(this.searchInput, nextPage);
    }

    // Reset the loading flags
    this.loading = false;
    this.loadingRequested = false;
  }


  addToWatchHistory(movie : Movie) {
    this.usersService.addWatchedMovie(movie).subscribe((SavedMovie=> {
      
    }));
  }
  addToSavedMovies(movie : Movie) {
    this.usersService.addSavedMovie(movie).subscribe((SavedMovie=> {
      
    }));
  }
}
