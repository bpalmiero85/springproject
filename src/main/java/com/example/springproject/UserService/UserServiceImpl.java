package com.example.springproject.UserService;

import com.example.springproject.Models.User;
import com.example.springproject.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public User findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public User save(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  @Override
  public boolean verifyUserCredentials(String username, String password) {
    User user = findByUsername(username);
    if (user != null && !user.getUsername().isBlank()) {
      return passwordEncoder.matches(password, user.getPassword());
    }
    return false;
  }
}
