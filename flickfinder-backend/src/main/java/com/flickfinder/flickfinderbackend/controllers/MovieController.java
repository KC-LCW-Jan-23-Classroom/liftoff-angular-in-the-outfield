package com.flickfinder.flickfinderbackend.controllers;

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

@RestController
@RequestMapping("/")
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    @Autowired
    UserRepository userRepository;

    //TODO post watch list based on user logged in

    @PostMapping("{userId}/watch_history")
    public ResponseEntity<List<Integer>> displayWatchHistory (@PathVariable int userId) {
        Optional<User> currentUser = userRepository.findById(userId);
//        if (currentUser.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
//        }
        List<Integer> watchedMovieIds = new ArrayList<>();
        List<WatchedMovie> watchHistory = currentUser.get().getWatchHistory();
        for (WatchedMovie movie : watchHistory) {
            watchedMovieIds.add(movie.getApiMovieId());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(watchedMovieIds);
    }

    //TODO get new movie to add to watch list



}
