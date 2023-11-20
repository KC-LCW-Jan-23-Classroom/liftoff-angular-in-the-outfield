package com.flickfinder.flickfinderbackend.models;

import com.flickfinder.flickfinderbackend.models.dtos.dto.Genre;

import java.util.List;

public class GenreResponse {
    private List<Genre> genres;

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
}