export class Genre {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
// curl --request GET \
//      --url 'https://api.themoviedb.org/3/movie/11?api_key=8f2b2d5a107f34d9c00874e7367892c7'
