package com.flickfinder.flickfinderbackend.models.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegistrationFormDTO {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @JsonProperty("password")
    private String password;
    @JsonProperty("verifyPassword")
    private String verifyPassword;

    public RegistrationFormDTO(Integer id, String name, String email, String password, String verifyPassword) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.verifyPassword = verifyPassword;
    }

    public String validatePassword(){
        if(!password.equals(verifyPassword)) {
            return "Passwords do not match. Please try again.";
        }
        return null;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
