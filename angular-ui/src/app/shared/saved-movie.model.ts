export class SavedMovie {
    apiMovieId: number;
    userId : number;
    constructor(aApiMovieId: number, aUserId : number) {
        this.apiMovieId = aApiMovieId;
        this.userId = aUserId;
    }
}