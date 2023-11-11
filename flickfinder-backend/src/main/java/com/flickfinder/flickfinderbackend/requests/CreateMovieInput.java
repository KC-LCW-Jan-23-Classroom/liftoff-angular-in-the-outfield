package com.flickfinder.flickfinderbackend.requests;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;

public record CreateMovieInput(int apiMovieId, int userId) {
    public WatchedMovie toWatchedMovie() {
        WatchedMovie newWatchedMovie = new WatchedMovie();
        newWatchedMovie.setApiMovieId(apiMovieId);
        newWatchedMovie.setUser(user);
//        newWatchedMovie.setMovieId(1);
        return newWatchedMovie;
    }
    public SavedMovie toSavedMovie() {
        SavedMovie newSavedMovie = new SavedMovie();
        newSavedMovie.setApiMovieId(apiMovieId);
        newSavedMovie.setUser(user);
        return newSavedMovie;
    }
}
