package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.models.data.UserRepository;
import com.flickfinder.flickfinderbackend.models.User;
import com.flickfinder.flickfinderbackend.models.dtos.RegistrationFormDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.mindrot.jbcrypt.BCrypt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.security.Keys;

import static java.lang.System.out;


@RestController
@RequestMapping("/auth")
public class UserAuthenticationController {
    @Autowired
    private UserRepository userRepository;

    String password = "mySecurePassword";
    String hashedPassword = PasswordEncoder.hashPassword(password);



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
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegistrationFormDTO formData) {
        ResponseEntity<Map<String, String>> response;
        Map<String, String> responseBody = new HashMap<>();
        // Check if the username is already in use
        if (userRepository.findByEmail(formData.getEmail()) != null) {
            responseBody.put("message", "User exists");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
            return response;
        }
        //Validate that passwords match
        String validationMessage = formData.validatePassword();
        if (validationMessage != null) {
            responseBody.put("error", validationMessage);
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
            return response;
        } else {
            User registerNewUser = new User();
            //set the email
            registerNewUser.setEmail(formData.getEmail());
            //set the users name
            registerNewUser.setName(formData.getName());
            // Encode the password before saving it
            registerNewUser.setPassword(PasswordEncoder.hashPassword(formData.getPassword()));
           //register the new user
            userRepository.save(registerNewUser);
            responseBody.put("message", "Successfully added new user ");
            responseBody.put("id", String.format("%d", registerNewUser.getId()));
            responseBody.put("name", String.format("%s", registerNewUser.getName()));
            responseBody.put("email", String.format("%s", registerNewUser.getEmail()));
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseBody);
            return response; }
        }


    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Map<String, String>> processUserLogin(@Valid @RequestBody RegistrationFormDTO loginFormDTO, HttpServletRequest request) {
        String email = loginFormDTO.getEmail();
        User user = userRepository.findByEmail(email);
        ResponseEntity<Map<String, String>> response;
        Map<String,String> responseBody = new HashMap<>();
        if(user == null){
            responseBody.put("message","User not found");
            response = ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(responseBody);
            return response;
        };

        String submittedPassword = loginFormDTO.getPassword();

        if(!PasswordEncoder.checkPassword(submittedPassword, user.getPassword())){
            responseBody.put("message","Password doesn't match");
            response = ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(responseBody);
            return response;
        }

        HttpSession session = request.getSession();
        session.setAttribute("user", user);
        String token = generateToken(user.getEmail());
        responseBody.put("token", token);
        responseBody.put("message","Login successful");
        responseBody.put("id", String.format("%d", user.getId()));
        responseBody.put("name", String.format("%s", user.getName()));

        response = ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(responseBody);
        return response;
    }

    private String generateToken(String email) {
        // Add your token generation logic here
        // Use a secure key generator
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        Date expirationDate = new Date(System.currentTimeMillis() + 10 * 24 * 60 * 60 * 1000);

        // For simplicity, let's say the token is the email itself
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, key) // Use a secure secret key
                .compact();
    }

}