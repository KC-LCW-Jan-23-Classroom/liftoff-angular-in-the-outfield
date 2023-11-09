package com.flickfinder.flickfinderbackend.models.dtos;

public class LoginFormDTO {
    private Integer id;
    private String username;
    private String password;

    public LoginFormDTO(Integer id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
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



    //make field for id, username and password
    //make method for getUsername getters, setters constructors
}
