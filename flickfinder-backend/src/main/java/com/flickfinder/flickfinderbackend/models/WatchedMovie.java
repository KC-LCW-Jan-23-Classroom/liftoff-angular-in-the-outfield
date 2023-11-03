package com.flickfinder.flickfinderbackend.models;

import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class WatchedMovie extends AbstractMovie {

    @NotBlank
    @ManyToOne
    private User user;

    public WatchedMovie() {
        super();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
