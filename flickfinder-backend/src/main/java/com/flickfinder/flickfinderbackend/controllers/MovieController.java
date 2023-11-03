package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.services.ApiKeyService;
import com.flickfinder.flickfinderbackend.services.MovieService;
import org.springframework.web.bind.annotation.*;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MovieController {
    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    @Autowired
    private ApiKeyService apiKeyService;

    @Autowired
    UserRepository userRepository;

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
//        return;
//        // Return a list of available movies
//    }
//
//
//    @PostMapping("/recommendations")
//    public List<Movie> getRecommendations(@RequestBody Movie movie) {
//        // Implement recommendation algorithm and return recommended movies
//    }
  
    //TODO post watch list based on user logged in

    @RequestMapping("watch_history")
    public ResponseEntity<List<Integer>> displayWatchHistory () {
//        @PathVariable int userId
//        Optional<User> currentUser = userRepository.findById(userId);
//        if (currentUser.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
//        }
//        Optional<User> currentUser = userRepository.findById(1);
//        System.out.println(currentUser);
//        List<Integer> watchedMovieIds = new ArrayList<>();
//        List<WatchedMovie> watchHistory = currentUser.get().getWatchHistory();
//        for (WatchedMovie movie : watchHistory) {
//            watchedMovieIds.add(movie.getApiMovieId());
//        }
        List<Integer> watchedMovieIds = new ArrayList<>();
        watchedMovieIds.add(4935);
        return ResponseEntity.status(HttpStatus.CREATED).body(watchedMovieIds);
    }

    //TODO get new movie to add to watch list
}
