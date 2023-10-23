package com.flickfinder.flickfinderbackend.controller;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MovieController {
    @GetMapping("/movies")
    public List<Movie> getMovies() {
        // Return a list of available movies
    }


    @PostMapping("/recommendations")
    public List<Movie> getRecommendations(@RequestBody Movie movie) {
        // Implement recommendation algorithm and return recommended movies
    }
}
