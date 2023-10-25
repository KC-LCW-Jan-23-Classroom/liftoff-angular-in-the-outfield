import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Movie {
  id: number;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
}

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  selectedMovie: Movie | undefined;
  movies: Movie[] = [];
  recommendedMovies: Movie[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the list of movies from your API.
    this.http.get<Movie[]>('/api/movies').subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  getRecommendations() {
    if (this.selectedMovie) {
     // Send a request to get movie recommendations based on the selected movie.
      this.http.post<Movie[]>('/api/recommendations', { movie: this.selectedMovie }).subscribe((data: Movie[]) => {
        this.recommendedMovies = data;
      });
    }
  }
}
