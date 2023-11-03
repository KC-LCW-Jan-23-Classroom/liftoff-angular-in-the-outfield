import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/movie.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ApikeyService } from '../../shared/apikey.service';

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
  constructor(private http: HttpClient, private apiKeyService: ApikeyService) {}

  selectedMovie: Movie | undefined;
  movies: Movie[] = [];
  recommendedMovies: Movie[] = [];
  apiUrl: string = 'api.themoviedb.org/3/movie/recommendations'; // Update with correct API endpoint

  ngOnInit() {
    // Hard-coded movie data for testing purposes
    this.movies = [
      {
        id: 1,
        title: 'Movie 1',
        director: 'Director 1',
        releaseYear: 2020,
        runtimeMinutes: 120,
        poster: 'https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
        plot: 'Plot 1',
        streamingSources: ['Netflix', 'Hulu'],
        cast: ['Actor 1', 'Actor 2'],
        genres: ['Thriller'], // Define genres as an array even if it contains a single genre
      }
    ];

    this.getRecommendations();
  }

  getRecommendations() {
    if (this.selectedMovie) {

      this.http.post<Movie[]>(this.apiUrl, { movie: this.selectedMovie }).subscribe((data: Movie[]) => {
        this.recommendedMovies = data;
      });
    }
  }
}
