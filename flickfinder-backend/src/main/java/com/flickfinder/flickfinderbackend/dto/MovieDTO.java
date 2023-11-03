package com.flickfinder.flickfinderbackend.dto;

import jakarta.validation.constraints.NotNull;

public class MovieDTO {

    @NotNull
    private int apiMovieId;

    @NotNull
    private int userId;

    MovieDTO() {
    }

    public int getApiMovieId() {
        return apiMovieId;
    }

    public void setApiMovieId(int apiMovieId) {
        this.apiMovieId = apiMovieId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
