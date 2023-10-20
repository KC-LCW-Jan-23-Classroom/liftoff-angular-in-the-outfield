package com.flickfinder.flickfinderbackend.models;

public abstract class AbstractMovie {
    private int movieId;

    public AbstractMovie() {
    }

    public AbstractMovie(int movieId) {
        this.movieId = movieId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}
