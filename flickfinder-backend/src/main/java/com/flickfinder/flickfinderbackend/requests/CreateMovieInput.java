package com.flickfinder.flickfinderbackend.requests;

import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;

public record CreateMovieInput(int apiMovieId, User user) {
    public WatchedMovie toWatchedMovie() {
        WatchedMovie newWatchedMovie = new WatchedMovie();
        newWatchedMovie.setApiMovieId(apiMovieId);
        newWatchedMovie.setUser(user);
        return newWatchedMovie;
    }
}
