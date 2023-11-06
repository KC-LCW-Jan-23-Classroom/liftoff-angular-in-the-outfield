package com.flickfinder.flickfinderbackend.models.data;

import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchedMovieRepository extends JpaRepository<WatchedMovie, Integer> {
    public List<WatchedMovie> findAllByUserId(int userId);
}
