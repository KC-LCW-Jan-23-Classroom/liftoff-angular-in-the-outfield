package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.User;
import org.springframework.stereotype.Service;

@Service
public class LogInService {

    private boolean loggedIn = false;

    private User currentUser;

    public LogInService() {

    }

    public boolean isLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }
}
