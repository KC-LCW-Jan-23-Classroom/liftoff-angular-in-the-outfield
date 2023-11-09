package com.flickfinder.flickfinderbackend.models;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 8, max = 42, message = "Password must be between 8 and 42 characters.")
    private String password;

    @OneToMany(mappedBy = "user")
    private List<WatchedMovie> watchedMovies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<SavedMovie> savedMovies = new ArrayList<>();

    public User() {
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<WatchedMovie> getWatchHistory() {
        return watchedMovies;
    }

    public void setWatchHistory(List<WatchedMovie> watchHistory) {
        this.watchedMovies = watchHistory;
    }

    public List<SavedMovie> getSavedMovies() {
        return savedMovies;
    }

    public void setSavedMovies(List<SavedMovie> savedMovies) {
        this.savedMovies = savedMovies;
    }

    public void addToWatchHistory(WatchedMovie newMovie) {
        this.watchedMovies.add(newMovie);
    }

    public void removeFromWatchHistory(WatchedMovie movieToRemove) {
        this.watchedMovies.remove(movieToRemove);
    }

    public boolean containsMovie(WatchedMovie aMovie) {
        return this.watchedMovies.contains(aMovie);
    }

    public void addToSavedMovies(SavedMovie newMovie) {
        this.savedMovies.add(newMovie);
    }
    public removeFromSavedMovies(Save)
}