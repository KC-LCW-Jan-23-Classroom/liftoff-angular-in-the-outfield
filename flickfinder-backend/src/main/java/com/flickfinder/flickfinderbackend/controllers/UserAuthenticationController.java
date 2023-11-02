package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.dtos.LoginFormDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

//    @PostMapping("/login")
//    @ResponseBody
//    public String processLoginForm(@Valid @RequestBody LoginFormDTO loginFormDTO,
//                                   Errors errors, HttpServletRequest request
//                                   ) {
//
//        if (errors.hasErrors()) {
//            return "response entities";
//        }

       // User theUser = userRepository.findByUsername(loginFormDTO.getUsername());

//        if (theUser == null) {
//            errors.rejectValue("username", "user.invalid", "The given username does not exist");
//            return "login";
//        }

//        String password = loginFormDTO.getPassword();
//
//        if (!theUser.isMatchingPassword(password)) {
//            errors.rejectValue("password", "password.invalid", "Invalid password");
//            return "login";
//        }

       // setUserInSession(request.getSession(), theUser);

       // return "response entities(these arent set up yet)";
    //}
//add authentication here make response entity
}
