import { Component } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  streamingServices = {
    netflix: false,
    hulu: false,
    amazon: false,
    apple: false,
    disney: false,
    peacock: false,
    hbo: false,
    paramount: false,
  };
  genre!: string;
  runtime!: string;
  timePeriod!: string;
  watchProvidersIds: string[] = [];
  movieResult!: Movie[];

  constructor(private http: HttpClient, private usersService: UsersService) {}

  getStreamingIds() {
    this.watchProvidersIds = [];

    if (this.streamingServices.netflix) {
      this.watchProvidersIds.push('8');
    }

    if (this.streamingServices.hulu) {
      this.watchProvidersIds.push('15');
    }

    if (this.streamingServices.amazon) {
      this.watchProvidersIds.push('9');
    }

    if (this.streamingServices.apple) {
      this.watchProvidersIds.push('2');
    }

    if (this.streamingServices.disney) {
      this.watchProvidersIds.push('337');
    }

    if (this.streamingServices.peacock) {
      this.watchProvidersIds.push('386');
    }

    if (this.streamingServices.hbo) {
      this.watchProvidersIds.push('1899');
    }

    if (this.streamingServices.paramount) {
      this.watchProvidersIds.push('531');
    }
  }

  onSubmit() {
    this.getStreamingIds();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    const quizRequest = {
      watchProviders: this.watchProvidersIds,
      genre: this.genre,
      runtime: this.runtime,
      timePeriod: this.timePeriod
    }

    console.log(this.watchProvidersIds);

    this.http
      .post<Movie[]>('http://localhost:8080/api/quiz', quizRequest, httpOptions)
      .subscribe((response) => {
        this.movieResult = response;
      });
  }

  addToWatchHistory(movie: Movie) {
    this.usersService.addWatchedMovie(movie).subscribe((SavedMovie) => {});
  }
  addToSavedMovies(movie: Movie) {
    this.usersService.addSavedMovie(movie).subscribe((SavedMovie) => {});
  }
}
