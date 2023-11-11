package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.data.SavedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserMovieListService {
    @Autowired
    private WatchedMovieRepository watchHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SavedMovieRepository savedMovieRepository;

    UserMovieListService() {}

    public List<WatchedMovie> getWatchedMoviesByUser(int userId) {
        return watchHistoryRepository.findAllByUserId(userId);
    }
    public List<SavedMovie> getSavedMoviesByUser(int userId) {
        return savedMovieRepository.findAllByUserId(userId);
    }

    public User getUserById(int userId) {
        Optional<User> result = userRepository.findById(userId);
        if (result.isEmpty()) {
            return null;
        }
        return result.get();
    }

    public boolean addWatchedMovie(int userId) {
        return true;
    }
}
