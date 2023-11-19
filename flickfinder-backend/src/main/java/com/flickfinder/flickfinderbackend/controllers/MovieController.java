package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.dtos.SavedMovieDTO;
import com.flickfinder.flickfinderbackend.services.LogInService;
import com.flickfinder.flickfinderbackend.services.UserMovieListService;
import com.flickfinder.flickfinderbackend.controllers.UserAuthenticationController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.services.ApiKeyService;
import com.flickfinder.flickfinderbackend.services.MovieService;

import reactor.core.publisher.Flux;

@RestController
//@CrossOrigin(origins ="http://localhost:4200/")
@RequestMapping("/api")
public class MovieController {

    private final UserMovieListService userMovieListService;

    private ApiKeyService apiKeyService;

    private final MovieService movieService;

    private final LogInService logInService;
    private int currentUserId;

    public MovieController(UserMovieListService userMovieListService, MovieService movieService, LogInService loginService) {
        this.userMovieListService = userMovieListService;
        this.movieService = movieService;
        this.logInService = loginService;
    }

    @GetMapping("trending")
    public Flux<Movie> getTrendingMovies() {
        return movieService.getTrendingMovies();
    }
  
//    @GetMapping("/movies")
//    public List<Movie> getMovies() {
//        return movieService.getMovies();
//
//
//    }


//    @PostMapping("/recommendations")
// public List<Movie> getRecommendations(@RequestBody Movie movie) {
//        List<Movie> recommendedMovies = new ArrayList<>();
//              return recommendedMovies;
//    }

    @RequestMapping("/watch_history")
    public ResponseEntity<List<Integer>> displayWatchHistory () {
        User user = UserAuthenticationController.logInService.getCurrentUser();
        int userId = user.getId();

        List<WatchedMovie> watchedMovies = userMovieListService.getWatchedMoviesByUser(userId);
        List<Integer> watchHistoryIds = userMovieListService.getWatchedMovieIdsFromList(watchedMovies);
        return ResponseEntity.status(HttpStatus.OK).body(watchHistoryIds);
    }

    @PostMapping("/watch_history/add")
    public ResponseEntity<WatchedMovie> addWatchedMovie(@RequestBody SavedMovieDTO savedMovieDTO) {
        WatchedMovie createdWatchedMovie = userMovieListService.addWatchedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @GetMapping("saved_movies/{userId}")
    public ResponseEntity<List<Integer>> displaySavedMovies(@PathVariable Integer userId) {
        List<SavedMovie> savedMovies = userMovieListService.getSavedMoviesByUser(currentUserId);
        List<Integer> savedMovieIds = userMovieListService.getSavedMovieIdsFromList(savedMovies);
        return ResponseEntity.status(HttpStatus.OK).body(savedMovieIds);
    }
    @PostMapping("/saved_movies/add")
    public ResponseEntity<SavedMovie> addSavedMovie(@RequestBody SavedMovieDTO savedMovieDTO) {
        SavedMovie createdSavedMovie = userMovieListService.addSavedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
