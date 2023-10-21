package com.flickfinder.flickfinderbackend.models;

import javax.persistence.Entity;

@Entity
public class WatchedMovie extends AbstractMovie {

    private int userId;

    public WatchedMovie() {
        super();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
