package com.flickfinder.flickfinderbackend.models;

import java.util.List;

public class QuizRequest {
    private List<String> watchProviders;
    private String genre;
    private String runtime;
    private String timePeriod;

    public List<String> getWatchProviders() {
        return watchProviders;
    }

    public void setWatchProviders(List<String> watchProviders) {
        this.watchProviders = watchProviders;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getRuntime() {
        return runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public String getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(String timePeriod) {
        this.timePeriod = timePeriod;
    }
}
