package com.flickfinder.flickfinderbackend.models;

import jakarta.validation.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class WatchedMovie extends AbstractMovie {

    @NotBlank
    @ManyToOne
    private int userId;

    public WatchedMovie() {}

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
