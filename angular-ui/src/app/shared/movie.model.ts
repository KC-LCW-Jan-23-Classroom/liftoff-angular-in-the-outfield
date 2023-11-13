export class Movie {
  public id: number;
  public title: string;
  public genres: string[];
  public releaseYear: number;
  public runtimeMinutes: number;
  public poster: string | null;
  public plot: string;
  public streamingSources: string[] | undefined;
  public director: string;
  public cast: string[];
spinAnimationState: any;

  constructor(
    id: number,
    title: string,
    genres: string[],
    releaseYear: number,
    runtimeMinutes: number,
    poster: string | null,
    plot: string,
    director: string,
    cast: string[],
    streamingSources?: string[] | undefined,

  ) {
    this.id = id;
    this.title = title;
    this.genres = genres;
    this.releaseYear = releaseYear;
    this.runtimeMinutes = runtimeMinutes;
    this.poster = poster;
    this.plot = plot;
    this.director = director
    this.cast = cast
    this.streamingSources = streamingSources;
  }

}
