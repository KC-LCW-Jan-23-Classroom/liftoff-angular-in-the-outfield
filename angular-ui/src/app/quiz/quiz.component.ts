import { Component } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  movieResult!: Movie;

  constructor(private http: HttpClient) {}

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
    const params = new HttpParams()
      .set('genre', this.genre)
      .set('runtime', this.runtime)
      .set('timePeriod', this.timePeriod)
      .set('watchProviders', this.watchProvidersIds.join(','));

    this.http
      .get<Movie>('http://localhost:8080/api/quiz', { params })
      .subscribe((response) => {
        this.movieResult = response;
        console.log(this.movieResult);
      });
  }
}
