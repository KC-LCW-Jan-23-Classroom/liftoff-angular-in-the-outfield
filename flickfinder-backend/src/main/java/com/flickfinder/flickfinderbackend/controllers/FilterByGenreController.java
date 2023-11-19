package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.models.dtos.dto.Genre;
import com.flickfinder.flickfinderbackend.services.GetGenresService;

import com.flickfinder.flickfinderbackend.services.MovieFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/filter-options")
public class FilterByGenreController {

    private final MovieFilterService movieFilterService;

    @Autowired
    public FilterByGenreController(MovieFilterService movieFilterService) {
        this.movieFilterService = movieFilterService;
    }
    @GetMapping("/genres")
    public List<Genre> fetchGenres() {
        List<Genre> genres = new ArrayList<>();



        return GetGenresService.fetchGenres();
    }


}