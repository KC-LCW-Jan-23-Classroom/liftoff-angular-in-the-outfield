package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("movies")
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    @Autowired
    UserRepository userRepository;

    //TODO post watch list based on user logged in

    @PostMapping("{userId}/watch-history")
    public ResponseEntity<List<WatchedMovie>> displayWatchList(@PathVariable int userId) {
        Optional<User> currentUser = userRepository.findById(userId);
//        if (currentUser.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST);
//        }
        List<WatchedMovie> watchHistory = currentUser.get().getWatchHistory();
        return ResponseEntity.status(HttpStatus.CREATED).body(watchHistory);
    }

    //TODO get new movie to add to watch list



}
