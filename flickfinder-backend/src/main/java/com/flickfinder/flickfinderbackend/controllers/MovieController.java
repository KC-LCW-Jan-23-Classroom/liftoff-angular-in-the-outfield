package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.data.SavedMovieRepository;
import jakarta.validation.Valid;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.services.ApiKeyService;
import com.flickfinder.flickfinderbackend.services.MovieService;
import com.flickfinder.flickfinderbackend.requests.CreateMovieInput;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
//@CrossOrigin(origins ="http://localhost:4200/")
@RequestMapping("/api")
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SavedMovieRepository savedMovieRepository;



    private ApiKeyService apiKeyService;

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
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

    @RequestMapping("/watch_history/{userId}")
    public ResponseEntity<List<Integer>> displayWatchHistory (@PathVariable int userId) {
//        Optional<User> currentUser = userRepository.findById(userId);
//        if (currentUser.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
//        }
        List<Integer> watchHistoryIds = this.getWatchHistoryByUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(watchHistoryIds);
    }

    //TODO get new movie to add to watch list
    @PostMapping("/watch_history/add")
    public ResponseEntity<WatchedMovie> addWatchedMovie(@RequestBody CreateMovieInput createMovieInput) {
        WatchedMovie createdWatchedMovie = createMovieInput.toWatchedMovie();
        watchHistoryRepository.save(createdWatchedMovie);
        return new ResponseEntity<>(createdWatchedMovie, HttpStatus.CREATED);

    }
    private List<Integer> getWatchHistoryByUser(int userId) {
        List<WatchedMovie> watchHistory = watchHistoryRepository.findAllByUserId(userId);
        List<Integer> watchedMovieIds = new ArrayList<>();
        for (WatchedMovie movie : watchHistory) {
            watchedMovieIds.add(movie.getApiMovieId());
        }
        return watchedMovieIds;
    }

    @GetMapping("saved_movies")
    public ResponseEntity<List<Integer>> displaySavedMovies() {

    }
    private List<Integer> getSavedMoviesByUser(int userId) {
        List<SavedMovie> savedMovies = savedMovieRepository.findAllByUserId(userId);
        List<Integer> savedMovieIds = new ArrayList<>();
        for (SavedMovie movie : savedMovies) {
            savedMovieIds.add(movie.getApiMovieId());
        }
        return savedMovieIds;
    }

    //TODO check if the movie is already in the users watch history
    @GetMapping("/watch_history/{userId}/{movieId}")
    public void checkIfWatched(@PathVariable int userId, int movieId) {
    }
  
}
