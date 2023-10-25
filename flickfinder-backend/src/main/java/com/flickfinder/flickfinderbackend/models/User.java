package com.flickfinder.flickfinderbackend.models;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany
    private List<WatchedMovie> watchHistory = new ArrayList<>();

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
        return watchHistory;
    }

    public void setWatchHistory(List<WatchedMovie> watchHistory) {
        this.watchHistory = watchHistory;
    }

    public void addToWatchHistory(WatchedMovie newMovie) {
        this.watchHistory.add(newMovie);
    }

    public void removeFromWatchHistory(WatchedMovie movieToRemove) {
        this.watchHistory.remove(movieToRemove);
    }

    public boolean containsMovie(WatchedMovie aMovie) {
        return this.watchHistory.contains(aMovie);
    }
}