package com.flickfinder.flickfinderbackend.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SavedMovieDTO {
    @NotNull
    private int apiMovieId;

    @NotNull
    private int userId;

    public SavedMovieDTO(int apiMovieId, int userId) {
        this.apiMovieId = apiMovieId;
        this.userId = userId;
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
