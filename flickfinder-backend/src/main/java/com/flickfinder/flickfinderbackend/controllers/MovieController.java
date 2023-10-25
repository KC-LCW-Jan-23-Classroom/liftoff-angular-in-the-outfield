package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.data.WatchedMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("movies")
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    //TODO post watch list based on user logged in

    @PostMapping("{userId}/watch-history")
    public ResponseEntity<List<WatchedMovie>> displayWatchList(@PathVariable int userId) {

        Iterable<WatchedMovie> allWatchedMovies = watchHistoryRepository.findAll();
        for (WatchedMovie movie : allWatchedMovies) {
            if (movie.getUser().getId() == userId) {

            }
        }
        User currentUser = new User(); // This should eventually be userRepository.findById(userId)
//        List<WatchedMovie> watchHistory = currentUser.getWatchHistory();
        return ResponseEntity.status(HttpStatus.CREATED).body(watchHistory);
    }

    //TODO get new movie to add to watch list



}
