import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/movie.model';
import { ApikeyService } from '../../shared/apikey.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MoviesService } from '../../shared/movies.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  animations: [
    trigger('spin', [
      state('start', style({ transform: 'rotate(0)' })),
      state('end', style({ transform: 'rotate(360deg)' })),
      transition('start <=> end', animate('1s ease-out')),
    ]),
  ]
})
export class RecommendationsComponent implements OnInit {
  private apiUrl: string = 'https://api.themoviedb.org/3/';
  recommendedMovies: number[] = [];
  movieId: number = 626735;
  selectedMovie: Movie[] = [];
  spinAnimationState: string = 'start';
  currentMovieIndex: number = 0;


  constructor(
    private http: HttpClient,
    private apiKeyService: ApikeyService,
    private movieService: MoviesService
  ) {}

  ngOnInit() {
    this.fetchRecommendedMoviesIds().subscribe((recommendedMovies) => {
      this.recommendedMovies = recommendedMovies;
      this.selectedMovie = [];
      this.recommendedMovies.forEach((id) => {
        this.movieService.fetchMovieListDetails([id]).subscribe((movies) => {
          this.selectedMovie.push(movies[0]);
          this.startSpin(); // Trigger animation for each movie
        });
      });
      console.log(this.recommendedMovies);
    });
  }

  startSpin() {
    this.selectedMovie[this.currentMovieIndex].spinAnimationState = 'end';
    setTimeout(() => {
      this.selectedMovie[this.currentMovieIndex].spinAnimationState = 'start';
    }, 1000); // Assuming the animation duration is 1s (1000ms)
    this.showNextMovie();
  }

  showNextMovie() {
    this.currentMovieIndex = (this.currentMovieIndex + 1) % this.selectedMovie.length;
  }

  fetchRecommendedMoviesIds(): Observable<number[]> {
    return this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        const url = `${this.apiUrl}/movie/${this.movieId}/similar?language=en-US&api_key=${apiKey}&include_adult=false`;
        return this.http.get<any>(url).pipe(
          map((response) => response.results.map((movie: any) => movie.id)),
          catchError((error) => {
            console.error('Error fetching recommended movies:', error);
            return of([]);
          })
        );
      })
    );
  }
}
