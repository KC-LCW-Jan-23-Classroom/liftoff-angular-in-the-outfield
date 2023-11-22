package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.dtos.SavedMovieDTO;
import com.flickfinder.flickfinderbackend.services.QuizService;
import com.flickfinder.flickfinderbackend.services.UserMovieListService;

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

    public MovieController(UserMovieListService userMovieListService, MovieService movieService, QuizService quizService) {
        this.userMovieListService = userMovieListService;
        this.movieService = movieService;
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

    @RequestMapping("/watch_history/{userId}")
    public ResponseEntity<List<Integer>> displayWatchHistory (@PathVariable int userId) {
        List<WatchedMovie> watchedMovies = userMovieListService.getWatchedMoviesByUser(userId);
        List<Integer> watchHistoryIds = userMovieListService.getWatchedMovieIdsFromList(watchedMovies);
        return ResponseEntity.status(HttpStatus.OK).body(watchHistoryIds);
    }

    //TODO get new movie to add to watch list
    @PostMapping("/watch_history/add")
    public ResponseEntity<WatchedMovie> addWatchedMovie(@RequestBody SavedMovieDTO savedMovieDTO) {
        WatchedMovie createdWatchedMovie = userMovieListService.addWatchedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @GetMapping("saved_movies/{userId}")
    public ResponseEntity<List<Integer>> displaySavedMovies(@PathVariable Integer userId) {
        List<SavedMovie> savedMovies = userMovieListService.getSavedMoviesByUser(userId);
        List<Integer> savedMovieIds = userMovieListService.getSavedMovieIdsFromList(savedMovies);
        return ResponseEntity.status(HttpStatus.OK).body(savedMovieIds);
    }
    @PostMapping("/saved_movies/add")
    public ResponseEntity<SavedMovie> addSavedMovie(@RequestBody SavedMovieDTO savedMovieDTO) {
        SavedMovie createdSavedMovie = userMovieListService.addSavedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
