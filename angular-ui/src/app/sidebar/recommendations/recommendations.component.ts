import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/movie.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
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

  getRecommendations(selectedMovieId: number): void {
    this.fetchRecommendationsMoviesIds(movieId).subscribe((movieIds) => {
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
