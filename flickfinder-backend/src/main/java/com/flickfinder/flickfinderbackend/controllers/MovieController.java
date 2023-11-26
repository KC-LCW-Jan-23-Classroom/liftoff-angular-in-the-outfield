package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.QuizRequest;
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

    @PostMapping("quiz")
    public Flux<Movie> getQuizResult(@RequestBody QuizRequest quizRequest) {

        return quizService.getRecommendedMovie(quizRequest.getWatchProviders(), quizRequest.getGenre(), quizRequest.getRuntime(), quizRequest.getTimePeriod());

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
        List<WatchedMovie> watchedMovies = userMovieListService.getWatchedMoviesByUser(getCurrentUserId());
        List<Integer> watchHistoryIds = userMovieListService.getWatchedMovieIdsFromList(watchedMovies);
        return ResponseEntity.status(HttpStatus.OK).body(watchHistoryIds);
    }

    @PostMapping("/watch_history/add")
    public ResponseEntity<WatchedMovie> addWatchedMovie(@RequestBody int apiMovieId) {
        SavedMovieDTO savedMovieDTO =  new SavedMovieDTO(apiMovieId,this.getCurrentUserId());
        WatchedMovie createdWatchedMovie = userMovieListService.addWatchedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @GetMapping("/saved_movies")
    public ResponseEntity<List<Integer>> displaySavedMovies() {
        List<SavedMovie> savedMovies = userMovieListService.getSavedMoviesByUser(getCurrentUserId());
        List<Integer> savedMovieIds = userMovieListService.getSavedMovieIdsFromList(savedMovies);
        return ResponseEntity.status(HttpStatus.OK).body(savedMovieIds);
    }
    @PostMapping("/saved_movies/add")
    public ResponseEntity<SavedMovie> addSavedMovie(@RequestBody int apiMovieId) {
        SavedMovieDTO savedMovieDTO = new SavedMovieDTO(apiMovieId, this.getCurrentUserId());
        SavedMovie createdSavedMovie = userMovieListService.addSavedMovie(savedMovieDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private int getCurrentUserId() {
        User user = UserAuthenticationController.logInService.getCurrentUser();
        return user.getId();
    }

    @PostMapping("/watch_history/delete")
    public ResponseEntity<WatchedMovie> deleteWatchedMovie(@RequestBody int apiMovieId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
