package com.flickfinder.flickfinderbackend.data;

import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchedMovieRepository extends CrudRepository<WatchedMovie, Integer> {
    public List<WatchedMovie> findAllByUserId();
}
