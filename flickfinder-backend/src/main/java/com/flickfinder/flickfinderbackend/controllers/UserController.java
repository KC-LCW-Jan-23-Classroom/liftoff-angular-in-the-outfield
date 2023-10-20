package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    UserRepository userRepository;

   // method and request mapping to get to that method

    @RequestMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }



}
