import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/movie.model';
import { ApikeyService } from '../../shared/apikey.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

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
  ],
})

export class RecommendationsComponent implements OnInit {
  apiUrl: string = 'https://api.themoviedb.org/3/movie/${this.selectedMovie.id}/similar?api_key=${this.apiKeyService.getApiKey()}&language=en-US&page=1&include_adult=false`;';
  spinAnimationState: string = 'start'; // Initial animation state  is 'start'


    constructor(private http: HttpClient, private apiKeyService: ApikeyService) {}

    selectedMovie: Movie | undefined;
    movies: Movie[] = [];
    recommendedMovies: Movie[] = [];

    ngOnInit() {
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
        },
//logic for get recommendations here
      ];
    }

getRecommendations() {
  if (this.selectedMovie?.id) {
    this.apiUrl = `https://api.themoviedb.org/3/movie/${this.selectedMovie.id}/similar?api_key=${this.apiKeyService.getApiKey()}&language=en-US&page=1&include_adult=false`;

    this.http.get<any>(this.apiUrl).subscribe((data: any) => {
      this.recommendedMovies = data.results; // Update recommendedMovies with API response
    }, error => {
      console.error('Error fetching recommendations:', error);
    });
  }
}

startSpinAnimation() {
  this.spinAnimationState = this.spinAnimationState === 'start' ? 'end' : 'start';
}
}


