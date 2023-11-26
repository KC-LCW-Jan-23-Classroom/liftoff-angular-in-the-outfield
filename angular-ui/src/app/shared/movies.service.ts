import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, forkJoin, switchMap, zip } from 'rxjs';
import { Movie } from './movie.model';
import { ApikeyService } from './apikey.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl: string = 'https://api.themoviedb.org/3/';
  private apiKey!: string;
  private movieId: number = 626735;
  // getSelectedMovieId: any;

  constructor(private http: HttpClient, private apiKeyService: ApikeyService) {
    this.apiKeyService
      .getApiKey()
      .subscribe((apiKey) => (this.apiKey = apiKey));
  }
  randomIndexPicker(recommendedMovies: number[]): number {
    const randomIndex = Math.floor(Math.random() * recommendedMovies.length);
    return recommendedMovies[randomIndex];
  }

  fetchTrendingMoviesIds(): Observable<number[]> {
    return this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        const url = `${this.apiUrl}/trending/movie/day?language=en-US&page=1&total_results=20&api_key=${apiKey}&include_adult=false`;
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

  fetchMovieListDetails(movieIds: number[]): Observable<Movie[]> {
    return this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        const movieObservables = movieIds.map((movieId) => {
          const movieUrl = `${this.apiUrl}movie/${movieId}?append_to_response=watch%2Fproviders&language=en-US&api_key=${apiKey}&include_adult=false`;
          const directorAndCast$ = this.getDirectorAndCast(movieId);

          return zip(
            this.http.get<any>(movieUrl),
            directorAndCast$,
            (movieResponse, directorAndCast) => {
              let subscription: string[] | undefined;
              let free: string[] | undefined;
              let ads: string[] | undefined;
              let rent: string[] | undefined;
              let buy: string[] | undefined;

              if (
                movieResponse['watch/providers'] &&
                movieResponse['watch/providers'].results &&
                movieResponse['watch/providers'].results.US
              ) {
                const flatrate =
                  movieResponse['watch/providers'].results.US.flatrate;
                if (flatrate) {
                  subscription = flatrate.map((source: any) =>
                    this.getLogoPath(source.logo_path)
                  );
                }
                const freeIds =
                  movieResponse['watch/providers'].results.US.free;
                if (freeIds) {
                  free = freeIds.map((source: any) =>
                    this.getLogoPath(source.logo_path)
                  );
                }

                const adIds = movieResponse['watch/providers'].results.US.ads;
                if (adIds) {
                  ads = adIds.map((source: any) =>
                    this.getLogoPath(source.logo_path)
                  );
                }

                const rentIds =
                  movieResponse['watch/providers'].results.US.rent;
                if (rentIds) {
                  rent = rentIds.map((source: any) =>
                    this.getLogoPath(source.logo_path)
                  );
                }

                const buyIds = movieResponse['watch/providers'].results.US.buy;
                if (buyIds) {
                  buy = buyIds.map((source: any) =>
                    this.getLogoPath(source.logo_path)
                  );
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
                subscription && subscription.length > 0
                  ? subscription
                  : undefined,
                free && free.length > 0 ? free : undefined,
                ads && ads.length > 0 ? ads : undefined,
                rent && rent.length > 0 ? rent : undefined,
                buy && buy.length > 0 ? buy : undefined,
                directorAndCast.director,
                directorAndCast.cast
              );
            }
          );
        });

        return forkJoin(movieObservables);
      })
    );
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

  getDirectorAndCast(
    movieId: number
  ): Observable<{ director: string; cast: string[] }> {
    return this.apiKeyService.getApiKey().pipe(
      switchMap((apiKey) => {
        const creditsUrl = `${this.apiUrl}/movie/${movieId}/credits?api_key=${apiKey}`;

        return this.http.get<any>(creditsUrl).pipe(
          map((response) => {
            const director = response.crew.find(
              (member: any) => member.job === 'Director'
            );
            const cast = response.cast
              .slice(0, 5)
              .map((actor: any) => actor.name);

            return {
              director: director ? director.name : 'N/A',
              cast,
            };
          })
        );
      })
    );
  }

  getApiUrl() {
    return this.apiUrl;
  }

}
