package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.services.SearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("title")
    public Flux<Movie> searchMoviesByTitle(@RequestParam String searchTerm, @RequestParam int page) {
        return searchService.searchMoviesByTitle(searchTerm, page);
    }

    @GetMapping("person")
    public Flux<Movie> searchMoviesByPerson(@RequestParam String searchTerm, @RequestParam int index) {
        if (index == 0) {
            return searchService.searchMoviesByPerson(searchTerm);
        } else {
            return searchService.displayMore(index);
        }
    }
}
