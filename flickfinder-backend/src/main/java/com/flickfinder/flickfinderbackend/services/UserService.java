package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.controllers.UserProfileDTO;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.dtos.UserEditDTO;
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
    public User updateUser(int userId, UserEditDTO userEditDTO) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (userEditDTO.getNewUsername() != null && !userEditDTO.getNewUsername().isEmpty()) {
                user.setUsername(userEditDTO.getNewUsername());
            }

            if (userEditDTO.getNewPassword() != null && !userEditDTO.getNewPassword().isEmpty()) {
                user.setPassword(userEditDTO.getNewPassword());
            }



            return userRepository.save(user);
        }

        return null;
    }

    public int updateUserProfile(Long userId, UserProfileDTO updatedProfile) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.updateUserProfile(updatedProfile);
            userRepository.save(user);
            return 1;
        }

        int i = 0;
        int i1 = i;
        return i1;
    }

}
