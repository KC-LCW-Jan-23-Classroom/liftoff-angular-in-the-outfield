import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/movie.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  animations: [
    trigger('spin', [
      state('void', style({ transform: 'rotate(0)' })),
      transition('* => *', [
        animate('1s', keyframes([
          style({ transform: 'rotate(0)', offset: 0 }),
          style({ transform: 'rotate(180deg)', offset: 0.5 }),
          style({ transform: 'rotate(360deg)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class RecommendationsComponent implements OnInit {
  selectedMovie: Movie | undefined;
  movies: Movie[] = [];
  recommendedMovies: Movie[] = [];
  apiKeyService: any;
  apiUrl: any;

  constructor(private http: HttpClient, private apiKeyService: ApikeyService) {}

  ngOnInit() {
    this.fetchMovies();

    this.http.get<Movie[]>('/api/movies').subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  fetchMovies() {
    throw new Error('Method not implemented.');
  }

  getRecommendations(event: any) {
    const selectedMovieId: number = parseInt(event.target.value, 20);
    this.fetchRecommendationsMoviesIds(selectedMovieId).subscribe((movieIds) => {
      this.recommendedMovies = this.movies.filter((movie) =>
        movieIds.includes(movie.id)
      );
    });
  }

  fetchRecommendationsMoviesIds(movieId: number): Observable<number[]> {
    return this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        const url = `${this.apiUrl}/movie/${movieId}/recommendations?language=en-US&page=1&total_results=20&api_key=${apiKey}&include_adult=false`;
        return this.http
          .get<any>(url)
          .pipe(
            map((response) =>
              response.results.slice(0, 20).map((movie: any) => movie.id)
            )
          );
      })
    );
  }
}
