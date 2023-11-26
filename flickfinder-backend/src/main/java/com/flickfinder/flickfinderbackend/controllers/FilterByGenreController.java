package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.dtos.dto.Genre;
import com.flickfinder.flickfinderbackend.services.GetGenresService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/filter-options")
public class FilterByGenreController {

    private final GetGenresService genresService;

    public FilterByGenreController(GetGenresService genresService) {
        this.genresService = genresService;
    }

    @GetMapping("/genres")
    public List<Genre> fetchGenres() {
        return genresService.fetchGenres();
    }
}