package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;






@RestController
@RequestMapping("/users")
class UserProfileUpdateController {

    @Autowired
    private UserService userService; // Your UserService implementation

    // Endpoint to update user profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUserProfile(@PathVariable("id") Long userId, @RequestBody UserProfileDTO updatedProfile) {
        boolean isUpdated;
        isUpdated = true;
        if (isUpdated) {
            return new ResponseEntity<>("User profile updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User profile update failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}