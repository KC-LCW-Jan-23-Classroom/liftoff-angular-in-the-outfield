package com.flickfinder.flickfinderbackend.models;
import jakarta.validation.constraints.Email;
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
    private String name;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;

    @OneToMany(mappedBy = "user")
    private List<WatchedMovie> watchedMovies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<SavedMovie> savedMovies = new ArrayList<>();

    public User() {
    }

    public User(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

  
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public boolean watchHistoryContains(WatchedMovie aMovie) {
        return this.watchedMovies.contains(aMovie);
    }

    public void addToSavedMovies(SavedMovie newMovie) {
        this.savedMovies.add(newMovie);
    }
    public void removeFromSavedMovies(SavedMovie savedMovie) {
        this.savedMovies.remove(savedMovie);
    }
    public boolean savedMoviesContains(SavedMovie aMovie) {
        return this.savedMovies.contains(aMovie);
    }
    public void updateUserInfo(String newUsername, String newPassword) {
        if (newUsername != null && !newUsername.isEmpty()) this.username = newUsername;
        if (newPassword != null && !newPassword.isEmpty()) {
            this.password = newPassword;
        }
    }
}
}