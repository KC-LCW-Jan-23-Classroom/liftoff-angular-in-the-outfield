package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.User;
import jakarta.validation.Valid;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    @Autowired
    UserRepository userRepository;

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

    private List<Integer> getWatchHistoryByUser(int userId) {
        List<WatchedMovie> watchHistory = watchHistoryRepository.findAllByUserId(userId);
        List<Integer> watchedMovieIds = new ArrayList<>();
        for (WatchedMovie movie : watchHistory) {
            watchedMovieIds.add(movie.getApiMovieId());
            System.out.println(movie.getApiMovieId());
        }
        return watchedMovieIds;
    }


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
    public ResponseEntity<List<Integer>> addWatchedMovie(@RequestBody WatchedMovie newWatchedMovie) {
        System.out.println("got a message");
        watchHistoryRepository.save(newWatchedMovie);
        List<Integer> watchHistoryIds = this.getWatchHistoryByUser(newWatchedMovie.getUser().getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(watchHistoryIds);
    }

    //TODO check if the movie is already in the users watch history
    @GetMapping("/watch_history/{userId}/{movieId}")
    public void checkIfWatched(@PathVariable int userId, int movieId) {

    }

}
