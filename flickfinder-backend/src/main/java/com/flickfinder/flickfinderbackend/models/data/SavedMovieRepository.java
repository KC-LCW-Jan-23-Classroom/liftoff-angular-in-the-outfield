package com.flickfinder.flickfinderbackend.models.data;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedMovieRepository extends CrudRepository<SavedMovie, Integer> {
    public List<SavedMovie> findAllByUserId(int userId);
}
