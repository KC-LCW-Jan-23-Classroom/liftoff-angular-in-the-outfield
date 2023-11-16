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

//    String candidatePassword = "passwordToCheck";
//    boolean passwordMatches = PasswordEncoder.checkPassword(candidatePassword, hashedPassword);



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
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Map<String, String>> processUserLogin(@Valid @RequestBody LoginFormDTO loginFormDTO, HttpServletRequest request) {
        String username = loginFormDTO.getName();
        User user = userRepository.findByUsername(username);
        ResponseEntity<Map<String, String>> response;
        Map<String,String> responseBody = new HashMap<>();
        if(user == null){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            responseBody.put("message","User not found");
            response = ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(responseBody);
            return response;
        };

        String submittedPassword = loginFormDTO.getPassword();

        if(!PasswordEncoder.checkPassword(submittedPassword, user.getPassword())){
//            return new ResponseEntity<>("Password does not match", HttpStatus.UNAUTHORIZED);
            responseBody.put("message","Password doesn't match");
            response = ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(responseBody);
            return response;
        }

        HttpSession session = request.getSession();
        session.setAttribute("user", user);
//        return new ResponseEntity<>("Login successful", HttpStatus.OK);
        responseBody.put("message","Login successful");
        responseBody.put("id", String.format("%d", user.getId()));
        responseBody.put("name", String.format("%s", user.getUsername()));

        response = ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseBody);
        return response;
    }


}