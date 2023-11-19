package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;



    public User updateUser(int userId, String newUsername, String newPassword) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.updateUserInfo(newUsername, newPassword);
            return userRepository.save(user);
        }

        return null;
    }
}
