import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { Movie } from '../movie-list/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl: string = 'https://api.themoviedb.org/3/';
  private apiKey: string = '6b1a4418de436636a649a2bdf791394e';
  private options = { params: new HttpParams().set('api_key', this.apiKey) };

  constructor(private http: HttpClient) {}

  fetchTrendingMoviesIds(): Observable<number[]> {
    // Make the API request to get trending movies with a limit of 20
    const url = `${this.apiUrl}/trending/movie/day?language=en-US&page=1&total_results=20`;
    return this.http.get<any>(url, this.options).pipe(
      // Map the response to extract movie IDs
      map((response) =>
        response.results.slice(0, 20).map((movie: any) => movie.id)
      )
    );
  }

  fetchMovieListDetails(movieIds: number[]): Observable<Movie[]> {
    const movieObservables = movieIds.map(movieId => {
      const movieUrl = `${this.apiUrl}/movie/${movieId}?append_to_response=watch%2Fproviders&language=en-US&api_key=${this.apiKey}`;
      const directorAndCast$ = this.getDirectorAndCast(movieId);
  
      return forkJoin([this.http.get<any>(movieUrl), directorAndCast$]).pipe(
        map((responses: any[]) => {
          const movieResponse = responses[0];
          const directorAndCast = responses[1];
  
          let streamingSources: string[] | undefined;
  
          if (movieResponse['watch/providers'] && movieResponse['watch/providers'].results && movieResponse['watch/providers'].results.US) {
            const flatrate = movieResponse['watch/providers'].results.US.flatrate;
            if (flatrate) {
              streamingSources = flatrate.map((source: any) => this.getLogoPath(source.logo_path));
            }
          }
  
          const posterPath = this.getImagePath(movieResponse.poster_path);
  
          return new Movie(
            movieResponse.id,
            movieResponse.title,
            movieResponse.genres.map((genre: any) => genre.name),
            new Date(movieResponse.release_date).getFullYear(),
            movieResponse.runtime,
            posterPath,
            movieResponse.overview,
            directorAndCast.director,
            directorAndCast.cast,
            streamingSources && streamingSources.length > 0 ? streamingSources : undefined,
            
          );
        })
      );
    });
  
    return forkJoin(movieObservables);
  }
  

  getImagePath(posterPath: string | null): string | null {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    }
    return null;
  }

  getLogoPath(logoPath: string | null): string | null {
    if (logoPath) {
      return `https://image.tmdb.org/t/p/original${logoPath}`;
    }
    return null;
  }

  getDirectorAndCast(movieId: number): Observable<{ director: string, cast: string[] }> {
    const creditsUrl = `${this.apiUrl}/movie/${movieId}/credits`;

    return this.http.get<any>(creditsUrl, this.options).pipe(
      map(response => {
        const director = response.crew.find((member: any) => member.job === 'Director');
        const cast = response.cast.slice(0, 5).map((actor: any) => actor.name);

        return {
          director: director ? director.name : 'N/A',
          cast
        };
      })
    );
  }
}
