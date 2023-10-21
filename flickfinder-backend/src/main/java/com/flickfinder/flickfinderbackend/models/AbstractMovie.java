package com.flickfinder.flickfinderbackend.models;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.Objects;

@MappedSuperclass
public abstract class AbstractMovie {
    @Id
    @GeneratedValue
    private int movieId;

    public AbstractMovie() {
    }

    public AbstractMovie(int movieId) {
        this.movieId = movieId;
    }

    public int getMovieId() {
        return movieId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AbstractMovie that)) return false;
        return movieId == that.movieId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(movieId);
    }
}
