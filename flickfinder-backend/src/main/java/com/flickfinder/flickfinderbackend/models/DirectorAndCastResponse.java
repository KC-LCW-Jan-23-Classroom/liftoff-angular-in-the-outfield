package com.flickfinder.flickfinderbackend.models;

import java.util.List;

public class DirectorAndCastResponse {
    private String director;
    private List<String> cast;

    public DirectorAndCastResponse(String director, List<String> cast) {
        this.director = director;
        this.cast = cast;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }
}
