
package com.flickfinder.flickfinderbackend.models.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;



public class ReviewDto {

    @JsonProperty("movieName")
    private String movieName;

    @JsonProperty("reviewText")
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