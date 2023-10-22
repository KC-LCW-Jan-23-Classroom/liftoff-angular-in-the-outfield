package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("movies")
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    //TODO post watch list based on user logged in

    @PostMapping("{userId}/watch-history")
    @ResponseBody
    public ResponseEntity<List<WatchedMovie>> displayWatchList(@PathVariable int userId) {


    }

    //TODO get new movie to add to watch list



}
