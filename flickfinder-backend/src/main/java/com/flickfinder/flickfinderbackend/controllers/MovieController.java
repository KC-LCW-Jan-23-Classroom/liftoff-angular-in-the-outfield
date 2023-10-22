package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    @Autowired
    WatchedMovieRepository watchHistoryRepository;

    //TODO post watch list based on user logged in
    public List<WatchedMovie> displayWatchList() {

        return (List<WatchedMovie>) watchHistoryRepository.findAll();
    }

    //TODO get new movie to add to watch list



}
