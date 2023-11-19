package com.flickfinder.flickfinderbackend.models.data;

//TODO: create repository for the Genres
import com.flickfinder.flickfinderbackend.models.dtos.dto.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
    // Custom methods if needed
}