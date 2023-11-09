import { User } from './user.model';

export class WatchedMovie {
    apiMovieId: number;
    user : User;
    constructor(aApiMovieId: number, aUser : User) {
        this.apiMovieId = aApiMovieId;
        this.user = aUser;
    }

}