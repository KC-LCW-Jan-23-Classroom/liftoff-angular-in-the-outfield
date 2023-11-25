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
    private List<String> subscription;
    private List<String> free;
    private List<String> ads;
    private List<String> rent;
    private List<String> buy;
    private String director;
    private List<String> cast;

    public Movie(String title,
                 int id,
                 List<String> genres,
                 int releaseYear,
                 int runtimeMinutes,
                 String poster,
                 String plot,
                 List<String> subscription,
                 List<String> free,
                 List<String> ads,
                 List<String> rent,
                 List<String> buy,
                 String director,
                 List<String> cast) {
        this.title = title;
        this.id = id;
        this.genres = genres;
        this.releaseYear = releaseYear;
        this.runtimeMinutes = runtimeMinutes;
        this.poster = poster;
        this.plot = plot;
        this.subscription = subscription;
        this.free = free;
        this.ads = ads;
        this.rent = rent;
        this.buy = buy;
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

    public String getDirector() {
        return director;
    }

    public List<String> getCast() {
        return cast;
    }

    public List<String> getSubscription() {
        return subscription;
    }

    public void setSubscription(List<String> subscription) {
        this.subscription = subscription;
    }

    public List<String> getFree() {
        return free;
    }

    public void setFree(List<String> free) {
        this.free = free;
    }

    public List<String> getAds() {
        return ads;
    }

    public void setAds(List<String> ads) {
        this.ads = ads;
    }

    public List<String> getRent() {
        return rent;
    }

    public void setRent(List<String> rent) {
        this.rent = rent;
    }

    public List<String> getBuy() {
        return buy;
    }

    public void setBuy(List<String> buy) {
        this.buy = buy;
    }
}

