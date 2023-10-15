package com.flickfinder.flickfinderbackend.models;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import javax.persistence.Entity;

@Entity
public class User {
    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 8, max = 42, message = "Password must be between 8 and 42 characters.")
    private String password;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}