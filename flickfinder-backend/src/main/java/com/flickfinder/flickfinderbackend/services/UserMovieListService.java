package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.SavedMovie;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import com.flickfinder.flickfinderbackend.models.data.SavedMovieRepository;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.data.WatchedMovieRepository;
import com.flickfinder.flickfinderbackend.models.dtos.SavedMovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserMovieListService {
    @Autowired
    private final WatchedMovieRepository watchHistoryRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final SavedMovieRepository savedMovieRepository;

    UserMovieListService(WatchedMovieRepository watchHistoryRepository, UserRepository userRepository, SavedMovieRepository savedMovieRepository) {
        this.watchHistoryRepository = watchHistoryRepository;
        this.userRepository = userRepository;
        this.savedMovieRepository = savedMovieRepository;
    }

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

    public WatchedMovie addWatchedMovie(SavedMovieDTO savedMovieDTO) {
        WatchedMovie watchedMovie = convertDTOtoWatchedMovie(savedMovieDTO);
        return watchHistoryRepository.save(watchedMovie);
    }
    public SavedMovie addSavedMovie(SavedMovieDTO savedMovieDTO) {
        SavedMovie savedMovie = convertDTOtoSavedMovie(savedMovieDTO);
        return savedMovieRepository.save(savedMovie);
    }

    public void deleteWatchedMovie(SavedMovieDTO savedMovieDTO) {
        WatchedMovie watchedMovie = convertDTOtoWatchedMovie(savedMovieDTO);
    }

    public List<Integer> getWatchedMovieIdsFromList(List<WatchedMovie> watchHistory) {
        List<Integer> watchedMovieIds = new ArrayList<>();
        for (WatchedMovie movie : watchHistory) {
            watchedMovieIds.add(movie.getApiMovieId());
        }
        return watchedMovieIds;
    }
    public List<Integer> getSavedMovieIdsFromList(List<SavedMovie> savedMovies) {
        List<Integer> savedMovieIds = new ArrayList<>();
        for (SavedMovie movie : savedMovies) {
            savedMovieIds.add(movie.getApiMovieId());
        }
        return savedMovieIds;
    }

    private SavedMovie convertDTOtoSavedMovie(SavedMovieDTO savedMovieDTO) {
        SavedMovie newSavedMovie = new SavedMovie();
        newSavedMovie.setApiMovieId(savedMovieDTO.getApiMovieId());
        User user = getUserById(savedMovieDTO.getUserId());
        newSavedMovie.setUser(user);
        return newSavedMovie;
    }

    private WatchedMovie convertDTOtoWatchedMovie(SavedMovieDTO savedMovieDTO) {
        WatchedMovie newWatchedMovie = new WatchedMovie();
        newWatchedMovie.setApiMovieId(savedMovieDTO.getApiMovieId());
        User user = getUserById(savedMovieDTO.getUserId());
        newWatchedMovie.setUser(user);
        return newWatchedMovie;
    }
}
