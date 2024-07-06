package com.example.springproject.UserService;

import com.example.springproject.Models.User;

public interface UserService {
    User findByUsername(String username);

    User save(User user);

    boolean verifyUserCredentials(String username, String password);
}
