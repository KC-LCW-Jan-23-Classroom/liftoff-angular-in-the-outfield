package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.dtos.SavedMovieDTO;
import com.flickfinder.flickfinderbackend.services.LogInService;
import com.flickfinder.flickfinderbackend.services.QuizService;

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
    private final QuizService quizService;
    private final LogInService logInService;
    private int currentUserId;

    public MovieController(UserMovieListService userMovieListService, MovieService movieService, LogInService loginService, QuizService quizService) {
        this.userMovieListService = userMovieListService;
        this.movieService = movieService;
        this.logInService = loginService;
        this.quizService = quizService;
    }

    @GetMapping("trending")
    public Flux<Movie> getTrendingMovies() {
        return movieService.getTrendingMovies();
    }

    // TODO @GetMapping("quiz") to call QuizService, pass quiz answers, then return selected movie

    @GetMapping("quiz")
    public Flux<Movie> getQuizResult(@RequestParam List<String> watchProviders, @RequestParam String genre, @RequestParam String runtime, @RequestParam String timePeriod) {

        return quizService.getRecommendedMovie(watchProviders, genre, runtime, timePeriod);

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
    public ResponseEntity<Flux<Movie>> displayWatchHistory () {
        List<WatchedMovie> watchedMovies = userMovieListService.getWatchedMoviesByUser(getCurrentUserId());
        List<Integer> watchHistoryIds = userMovieListService.getWatchedMovieIdsFromList(watchedMovies);
        Flux<Movie> watchedMovieList = movieService.getMovieDetails(watchHistoryIds);
        return ResponseEntity.status(HttpStatus.OK).body(watchedMovieList);
    }

    @PostMapping("/watch_history/add")
    public ResponseEntity<WatchedMovie> addWatchedMovie(@RequestBody int apiMovieId) {
        SavedMovieDTO savedMovieDTO =  new SavedMovieDTO(apiMovieId,this.getCurrentUserId());
        WatchedMovie createdWatchedMovie = userMovieListService.addWatchedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @GetMapping("/saved_movies")
    public ResponseEntity<Flux<Movie>> displaySavedMovies() {
        List<SavedMovie> savedMovies = userMovieListService.getSavedMoviesByUser(getCurrentUserId());
        List<Integer> savedMovieIds = userMovieListService.getSavedMovieIdsFromList(savedMovies);
        Flux<Movie> savedMovieList = movieService.getMovieDetails(savedMovieIds);
        return ResponseEntity.status(HttpStatus.OK).body(savedMovieList);
    }
    @PostMapping("/saved_movies/add")
    public ResponseEntity<SavedMovie> addSavedMovie(@RequestBody int apiMovieId) {
        SavedMovieDTO savedMovieDTO = new SavedMovieDTO(apiMovieId, this.getCurrentUserId());
        SavedMovie createdSavedMovie = userMovieListService.addSavedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private int getCurrentUserId() {
        User user = UserAuthenticationController.logInService.getCurrentUser();
        if (user == null) {
            return 0;
        }
        return user.getId();
    }

    @GetMapping("/watch_history/delete/{apiMovieId}")
    public ResponseEntity<WatchedMovie> deleteWatchedMovie(@PathVariable int apiMovieId) {
        if (userMovieListService.deleteWatchedMovie(getCurrentUserId(), apiMovieId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/saved_movies/delete/{apiMovieId}")
    public ResponseEntity<SavedMovie> deleteSavedMovie(@PathVariable int apiMovieId) {
        if (userMovieListService.deleteSavedMovie(getCurrentUserId(), apiMovieId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }



}
