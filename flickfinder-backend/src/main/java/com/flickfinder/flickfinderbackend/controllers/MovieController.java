package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.web.bind.annotation.*;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<User> currentUser = userRepository.findById(userId);
////        if (currentUser.isEmpty()) {
////            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
////        }
//        System.out.println(currentUser.get().getId());
//        List<Integer> watchedMovieIds = new ArrayList<>();
//        List<WatchedMovie> watchHistory = currentUser.get().getWatchHistory();
        List<WatchedMovie> watchHistory = watchHistoryRepository.findAllByUserId();
        List<Integer> watchedMovieIds = new ArrayList<>();
        for (WatchedMovie movie : watchHistory) {
            watchedMovieIds.add(movie.getApiMovieId());
            System.out.println(movie.getApiMovieId());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(watchedMovieIds);
    }

    //TODO get new movie to add to watch list

}
