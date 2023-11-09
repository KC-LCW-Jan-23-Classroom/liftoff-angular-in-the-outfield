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

import java.util.HashMap;
import java.util.Map;


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
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody LoginFormDTO formData) {
        ResponseEntity<Map<String, String>> response;
        Map<String,String> responseBody = new HashMap<>();
        // Check if the username is already in use
        if (userRepository.findByUsername(formData.getName()) != null) {
            responseBody.put("message","User exists");
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseBody);
            return response;
        }


        User registerNewUser = new User();
        registerNewUser.setUsername(formData.getName());
        registerNewUser.setPassword(formData.getPassword());


        // Encode the password before saving it
        registerNewUser.setPassword(PasswordEncoder.hashPassword(formData.getPassword()));
        userRepository.save(registerNewUser);



        responseBody.put("message","Successfully added new user ");
        responseBody.put("id", String.format("%d", registerNewUser.getId()));
        responseBody.put("name", String.format("%s", registerNewUser.getUsername()));


        response = ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseBody);
        return response;
//        ResponseEntity<String> response;
//        response = ResponseEntity.status(HttpStatus.CREATED).body( "Successfully created a new user" + registerNewUser);

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
