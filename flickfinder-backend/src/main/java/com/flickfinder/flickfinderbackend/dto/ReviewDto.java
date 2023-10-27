package com.flickfinder.flickfinderbackend.dto;

public class ReviewDto {
    private String movieName;
    private String reviewText;

    // Constructors, getters, and setters

    public ReviewDto() {
    }

    public ReviewDto(String movieName, String reviewText) {
        this.movieName = movieName;
        this.reviewText = reviewText;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}