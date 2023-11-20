package com.flickfinder.flickfinderbackend.models.dtos;

public class UserEditDTO {
    private final String newUsername;
    private final String newPassword;

    public UserEditDTO(String newUsername, String newPassword) {
        this.newUsername = newUsername;
        this.newPassword = newPassword;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public String getNewPassword() {
        return newPassword;
    }

}
