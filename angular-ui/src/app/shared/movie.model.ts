export class Movie {
  public id: number;
  public title: string;
  public genres: string[];
  public releaseYear: number;
  public runtimeMinutes: number;
  public poster: string | null;
  public plot: string;
  public subscription: string[] | undefined;
  public free: string[] | undefined;
  public ads: string[] | undefined;
  public rent: string[] | undefined;
  public buy: string[] | undefined;
  public director: string;
  public cast: string[];
  public isWatched: boolean;
  public isSaved: boolean;
  spinAnimationState: any;

  constructor(
    id: number,
    title: string,
    genres: string[],
    releaseYear: number,
    runtimeMinutes: number,
    poster: string | null,
    plot: string,
    subscription: string[] | undefined,
    free: string[] | undefined,
    ads: string[] | undefined,
    rent: string[] | undefined,
    buy: string[] | undefined,
    director: string,
    cast: string[],
    isWatched: boolean = false,
    isSaved: boolean = false
  ) {
    this.title = title;
    this.id = id;
    this.genres = genres;
    this.releaseYear = releaseYear;
    this.runtimeMinutes = runtimeMinutes;
    this.poster = poster;
    this.plot = plot;
    this.subscription = subscription;
    this.free = free;
    this.ads = ads;
    this.rent = rent;
    this.buy = buy;
    this.director = director;
    this.cast = cast;
    this.isWatched = isWatched;
    this.isSaved = isSaved;
  }

  containsMovie(movieList: Movie[]): boolean {
    for (let movie of movieList) {
      if (this.id === movie.id) {
        return true
      }
    }
    return false;
  }
}
