import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/movie.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RecommendationsComponent implements OnInit {
  selectedMovie: Movie | undefined;
  movies: Movie[] = [];
  recommendedMovies: Movie[] = [];
  apiKeyService: any;
  apiUrl: any;

  constructor(private http: HttpClient) {}

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
