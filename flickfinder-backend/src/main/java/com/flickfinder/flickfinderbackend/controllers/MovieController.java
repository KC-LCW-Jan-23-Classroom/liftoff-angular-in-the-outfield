package com.flickfinder.flickfinderbackend.controllers;

import org.springframework.web.bind.annotation.*;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

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

    @RequestMapping("/watch_history/{userId}")
    public ResponseEntity<List<Integer>> displayWatchHistory (@PathVariable int userId) {
//        Optional<User> currentUser = userRepository.findById(userId);
////        if (currentUser.isEmpty()) {
////            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
////        }
//        System.out.println(currentUser.get().getId());
//        List<Integer> watchedMovieIds = new ArrayList<>();
//        List<WatchedMovie> watchHistory = currentUser.get().getWatchHistory();
        List<WatchedMovie> watchHistory = watchHistoryRepository.findAllByUserId(userId);
        List<Integer> watchedMovieIds = new ArrayList<>();
        for (WatchedMovie movie : watchHistory) {
            watchedMovieIds.add(movie.getApiMovieId());
            System.out.println(movie.getApiMovieId());
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(watchedMovieIds);
    }

    //TODO get new movie to add to watch list
    @PostMapping("/watch_history/{userId}/add")
    public void addWatchedMovie(@PathVariable int userId, @RequestBody int apiMovieId) {

    }

    //TODO check if the movie is already in the users watch history
    @GetMapping("/watch_history/{userId}/{movieId}")
    public void checkIfWatched(@PathVariable int userId,) {

    }

}
