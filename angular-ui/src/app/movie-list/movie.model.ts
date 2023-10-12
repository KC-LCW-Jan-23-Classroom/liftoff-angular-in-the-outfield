export class Movie {
  public id: number;
  public title: string;
  public genres: string[];
  public rating: string;
  public releaseYear: number;
  public runtimeMinutes: number;
  public poster: string;
  public plot: string;
  public director: string;
  public stars: string[];
  public streamingSources: string[];

  constructor(
    id: number,
    title: string,
    genres: string[],
    rating: string,
    releaseYear: number,
    runtimeMinutes: number,
    poster: string,
    plot: string,
    director: string,
    stars: string[],
    streamingSources: string[]
  ) {
    this.id = id;
    this.title = title;
    this.genres = genres;
    this.rating = rating;
    this.rating = rating;
    this.releaseYear = releaseYear;
    this.runtimeMinutes = runtimeMinutes;
    this.poster = poster;
    this.plot = plot;
    this.streamingSources = streamingSources;
    this.director = director;
    this.stars = stars;
  }
}
