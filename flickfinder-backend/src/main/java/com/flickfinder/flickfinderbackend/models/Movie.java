package com.flickfinder.flickfinderbackend.models;
public class Movie {
    private String title;
    private int id;
    private String[] genres;
    private int releaseYear;
    private int runtimeMinutes;
    private String poster;
    private String plot;
    private String[] streamingSources;
    private String director;
    private String[] cast;

    public Movie(String title, int id, String[] genres, int releaseYear, int runtimeMinutes, String poster, String plot, String[] streamingSources, String director, String[] cast) {
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

    public void setGenres(String[] genres) {
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

    public void setStreamingSources(String[] streamingSources) {
        this.streamingSources = streamingSources;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setCast(String[] cast) {
        this.cast = cast;
    }

    public String[] getGenres() {
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

    public String[] getStreamingSources() {
        return streamingSources;
    }

    public String getDirector() {
        return director;
    }

    public String[] getCast() {
        return cast;
    }
}

