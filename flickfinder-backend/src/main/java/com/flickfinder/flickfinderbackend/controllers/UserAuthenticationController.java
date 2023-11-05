package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.dtos.LoginFormDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.mindrot.jbcrypt.BCrypt;



@RestController
@RequestMapping("/auth")
public class UserAuthenticationController {
    @Autowired
    private UserRepository userRepository;

    String password = "mySecurePassword";
    String hashedPassword = PasswordEncoder.hashPassword(password);

    String candidatePassword = "passwordToCheck";
    boolean passwordMatches = PasswordEncoder.checkPassword(candidatePassword, hashedPassword);



    public class PasswordEncoder {

        public static String hashPassword(String password) {
            String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            return hashedPassword;
        }
        public static boolean checkPassword(String candidate, String hashed) {
            return BCrypt.checkpw(candidate, hashed);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody User user) {
        // Check if the username is already in use
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already in use");
        }

        // Encode the password before saving it
        user.setPassword(PasswordEncoder.hashPassword(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> processUserLogin(@Valid @RequestBody LoginFormDTO loginFormDTO, HttpServletRequest request) {
        String username = loginFormDTO.getName();
        User user = userRepository.findByUsername(username);

        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        };

        String submittedPassword = loginFormDTO.getPassword();

        if(!user.getPassword().equals(submittedPassword)){
            return new ResponseEntity<>("Password does not match", HttpStatus.UNAUTHORIZED);
        };

        HttpSession session = request.getSession();
        session.setAttribute("user", user);
        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    }


}






    ///////////
   // method and request mapping to get to that method

//    @RequestMapping("/users")
//    public List<User> getUsers() {
//        return (List<User>) userRepository.findAll();
//    }

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
//}
