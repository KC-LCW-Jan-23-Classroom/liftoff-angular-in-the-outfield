package com.flickfinder.flickfinderbackend.models;

import java.util.List;

public class Movie {
    private String title;
    private int id;
    private List<String> genres;
    private int releaseYear;
    private int runtimeMinutes;
    private String poster;
    private String plot;
    private List<String> streamingSources;
    private String director;
    private List<String> cast;

    public Movie(String title,
                 int id,
                 List<String> genres,
                 int releaseYear,
                 int runtimeMinutes,
                 String poster,
                 String plot,
                 List<String> streamingSources,
                 String director,
                 List<String> cast) {
        this.title = title;
        this.id = id;
        this.genres = genres;
        this.releaseYear = releaseYear;
        this.runtimeMinutes = runtimeMinutes;
        this.poster = poster;
        this.plot = plot;
        this.streamingSources = streamingSources;
        this.director = director;
        this.cast = cast;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setRuntimeMinutes(int runtimeMinutes) {
        this.runtimeMinutes = runtimeMinutes;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public void setPlot(String plot) {
        this.plot = plot;
    }

    public void setStreamingSources(List<String> streamingSources) {
        this.streamingSources = streamingSources;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public List<String> getGenres() {
        return genres;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public int getRuntimeMinutes() {
        return runtimeMinutes;
    }

    public String getPoster() {
        return poster;
    }

    public String getPlot() {
        return plot;
    }

    public List<String> getStreamingSources() {
        return streamingSources;
    }

    public String getDirector() {
        return director;
    }

    public List<String> getCast() {
        return cast;
    }
}

