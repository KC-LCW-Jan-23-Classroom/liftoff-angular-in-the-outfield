package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint for updating user info
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId,
                                           @RequestParam(required = false) String newUsername,
                                           @RequestParam(required = false) String newPassword) {
        User updatedUser = userService.updateUser(userId, newUsername, newPassword);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
