package com.flickfinder.flickfinderbackend.models;


import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MovieResponse {
    private int page;
    @JsonProperty("total_results")
    private int totalResults;
    @JsonProperty("total_pages")
    private int totalPages;
    private List<Movie> results;


    public MovieResponse() {
    }


    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(int totalResults) {
        this.totalResults = totalResults;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public List<Movie> getResults() {
        return results;
    }

    public void setResults(List<Movie> results) {
        this.results = results;
    }

    public List<Movie> getMovies() {
        return results;
    }

}
