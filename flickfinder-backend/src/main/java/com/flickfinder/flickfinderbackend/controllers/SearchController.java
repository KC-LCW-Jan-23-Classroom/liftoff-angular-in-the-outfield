package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.services.MovieService;
import com.flickfinder.flickfinderbackend.services.SearchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final MovieService movieService;
    private final Logger logger = LoggerFactory.getLogger(SearchController.class);


    public SearchController(SearchService searchService, MovieService movieService) {
        this.searchService = searchService;
        this.movieService = movieService;

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


    @GetMapping("/genre")
    public Mono<ResponseEntity<?>> getMoviesByGenre(
            @RequestParam(value = "with_genres") Integer genreId,
            @RequestParam(value = "page", required = false) Integer page) {

        int pageNumber = (page != null) ? page : 1;

        return movieService.getMoviesByGenre(genreId, pageNumber)
                .collectList()
                .flatMap(movies -> {
                    if (!movies.isEmpty()) {
                        logger.info("Movies found for genreId: {} and page: {}", genreId, pageNumber);
                        return Mono.just(ResponseEntity.ok(movies));
                    } else {
                        logger.warn("No movies found for genreId: {} and page: {}", genreId, pageNumber);
                        return Mono.just(ResponseEntity.notFound().build());
                    }
                })
                .onErrorResume(e -> {
                    logger.error("Error occurred while fetching movies by genre", e);
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

}